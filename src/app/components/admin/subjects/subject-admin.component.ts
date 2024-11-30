import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/models/subject.model';
import { SubjectService } from 'src/app/services/subjects/subject.service';

@Component({
  selector: 'app-subject-admin',
  templateUrl: './subject-admin.component.html',
  styleUrls: ['./subject-admin.component.scss'],
})
export class SubjectAdminComponent implements OnInit {
  subjectsList: Subject[] = [];
  isLoading: boolean = true;

  constructor(private subjectService: SubjectService) {}

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects(): void {
    this.subjectService.getSubjects().subscribe((data: any) => {
      this.subjectsList = Array.isArray(data.subjects) ? data.subjects : [];
      this.isLoading = false;
    });
  }

  deleteSubject(id: number, name: string): void {
       const confirmMessage = `¿Estás seguro de que deseas eliminar esta asignatura: "${name}"?`;

    if (confirm('¿Estás seguro de que deseas eliminar esta asignatura?')) {
      this.subjectService.deleteSubject(id).subscribe({
        next: () => {
          this.subjectsList = this.subjectsList.filter(
            (subject) => subject.id !== id
          );
          alert('Asignatura eliminada correctamente');
        },
        error: (error) => {
          console.error('Error eliminando la asignatura:', error);
          alert(
            'Hubo un problema al eliminar la asignatura. Inténtalo de nuevo más tarde.'
          );
        },
      });
    }
  }
}
