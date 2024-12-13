import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'src/app/models/subject.model';
import { SubjectService } from 'src/app/services/subjects/subject.service';
import Swal from 'sweetalert2';

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
    } else {
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
        Swal.fire({
          title: 'Error al cargar la asignatura',
          text: 'Hubo un problema al obtener los datos de la asignatura.',
          icon: 'error',
        });
        this.isLoading = false;
      }
    });
  }

  saveSubject(): void {
    if (this.subject.id === 0) {
      // Crear nueva asignatura
      this.subjectService.createSubject(this.subject).subscribe(
        (newSubject) => {
          Swal.fire({
            title: 'Asignatura creada con éxito',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          });
          this.isLoading = false;
          this.router.navigate(['/admin/subject-admin']);
        },
        (error) => {
          Swal.fire({
            title: 'Error al crear la asignatura',
            text: 'No se pudo guardar la asignatura. Por favor, inténtelo de nuevo.',
            icon: 'error',
          });
          this.isLoading = false;
        }
      );
    } else {
      // Editar asignatura existente
      this.subjectService.updateSubject(this.subject).subscribe(
        () => {
          Swal.fire({
            title: 'Asignatura actualizada con éxito',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          });
          this.isLoading = false;
          this.router.navigate(['/admin/subject-admin']);
        },
        (error) => {
          Swal.fire({
            title: 'Error al actualizar la asignatura',
            text: 'No se pudieron guardar los cambios. Por favor, inténtelo de nuevo.',
            icon: 'error',
          });
          this.isLoading = false;
        }
      );
    }
  }

  closeForm(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Si cierras el formulario, se perderán los cambios no guardados.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4b6584',
      cancelButtonColor: '#c85a42',
      confirmButtonText: 'Sí, cerrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/admin/subject-admin']);
      }
    });
  }
}
