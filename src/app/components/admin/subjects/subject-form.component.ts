import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'src/app/models/subject.model';
import { SubjectService } from 'src/app/services/subjects/subject.service';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  styleUrls: ['./subject-admin.component.scss'],
})
export class SubjectFormComponent implements OnInit {
  @Input() selectedSubject: Subject | null = null;

  subject: Subject = {
    id: 0,
    name: '',
    level: '',
  };
  isEditMode: boolean = false;
  isLoading: boolean = true;

  constructor(
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.selectedSubject) {
      this.subject = { ...this.selectedSubject };
       this.isEditMode = true;
       this.isLoading = false;
    }else{
      this.isLoading = false;
    }

    this.route.params.subscribe((params) => {
      const subjectId = params['id'];
      if (subjectId) {
        this.isLoading = true;
        this.subjectService
          .getSubjectById(subjectId)
          .subscribe((data: Subject) => {
            this.subject = data;
             this.isEditMode = true;
             this.isLoading = false;
          });
      } else {
        this.isLoading = false;
      }
    });
  }

  saveSubject(): void {
    if (this.subject.id === 0) {
      // Crear nueva asignatura
      this.subjectService.createSubject(this.subject).subscribe(
        (newSubject) => {
          console.log('Asignatura creada:', newSubject);
          this.router.navigate(['/admin/subject-admin']);
          this.isLoading = false;
        },
        (error) => {
          console.error('Error al guardar la asignatura', error);
          this.isLoading = false;
        }
      );
    } else {
      // Editar asignatura existente
      this.subjectService.updateSubject(this.subject).subscribe(
        (updatedSubject) => {
          console.log('Asignatura actualizada:', updatedSubject);
          this.router.navigate(['/admin/subject-admin']);
          this.isLoading = false;
        },
        (error) => {
          console.error('Error al actualizar la asignatura', error);
          this.isLoading = false;
        }
      );
    }
  }

  closeForm(): void {
    this.router.navigate(['/admin/subject-admin']);
  }
}
