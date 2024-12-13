import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/models/subject.model';
import { SubjectService } from 'src/app/services/subjects/subject.service';
import Swal from 'sweetalert2';

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
    this.subjectService.getSubjects().subscribe(
      (data: any) => {
        this.subjectsList = Array.isArray(data.subjects) ? data.subjects : [];
        this.isLoading = false;
      },
      (error) => {
        Swal.fire({
          title: 'Error al cargar las asignaturas',
          text: 'Ocurrió un problema al cargar los datos. Intenta nuevamente.',
          icon: 'error',
        });
        this.isLoading = false;
      }
    );
  }

  deleteSubject(id: number, name: string): void {
    Swal.fire({
      title: `¿Estás seguro de que deseas eliminar esta asignatura: "${name}"?`,
      text: '¡Esta acción no se puede deshacer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4b6584',
      cancelButtonColor: '#c85a42',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.subjectService.deleteSubject(id).subscribe(
          () => {
            Swal.fire({
              title: '¡Eliminado!',
              text: `La asignatura "${name}" ha sido eliminada correctamente.`,
              icon: 'success',
            });
            this.loadSubjects();
          },
          (error) => {
            Swal.fire({
              title: 'Error al eliminar la asignatura',
              text: 'Hubo un problema al intentar eliminar la asignatura. Intenta nuevamente.',
              icon: 'error',
            });
          }
        );
      }
    });
  }
}
