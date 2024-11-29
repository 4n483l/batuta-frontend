import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SubjectService } from 'src/app/services/subjects/subject.service';

@Component({
  selector: 'app-subject-admin',
  templateUrl: './subject-admin.component.html',
  styleUrls: ['./subject-admin.component.scss'],
})
export class SubjectAdminComponent implements OnInit {
  subjects: any[] = [];

  constructor(private subjectService: SubjectService, private router: Router) {}

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects(): void {
     this.subjectService.getSubjects().subscribe(
       (data: any) => {
         if (Array.isArray(data.subjects)) {
           this.subjects = data.subjects;
         } else {
           console.error('La respuesta no es un array', data.subjects);
         }
       },
       (error) => {
         console.error('Error al cargar los datos de subjects', error);
       }
     );
  }

  addSubject(): void {
    this.router.navigate(['/admin/subject-form']);
  }

  editSubject(id: number): void {
    this.router.navigate([`/admin/subject-form/${id}`]);
  }

  deleteSubject(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta asignatura?')) {
      this.subjectService.deleteSubject(id).subscribe(() => {
        this.loadSubjects();
      });
    }
  }
}
