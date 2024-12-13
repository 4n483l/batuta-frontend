import { Component, OnInit } from '@angular/core';
import { ExamService } from 'src/app/services/exams/exam.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-exam-admin',
  templateUrl: './exam-admin.component.html',
  styleUrls: ['./exam-admin.component.scss'],
})
export class ExamAdminComponent implements OnInit {
  currentList: any[] = [];
  isLoading: boolean = true;

  constructor(private examService: ExamService) {}

  ngOnInit(): void {
    this.loadExams();
  }

  loadExams(): void {
    this.isLoading = true;

    this.examService.getExams().subscribe(
      (data: any) => {
        this.currentList = data.Exams || [];
        this.isLoading = false;
      },
      (error) => {
        Swal.fire({
          title: 'Error al cargar exámenes',
          text: 'Hubo un problema al cargar los exámenes. Intenta nuevamente.',
          icon: 'error',
        });
        this.isLoading = false;
      }
    );
  }

  deleteExam(examId: number): void {
    Swal.fire({
      title: `¿Estás seguro de que quieres eliminar este examen?`,
      text: '¡Esta acción no se puede deshacer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4b6584',
      cancelButtonColor: '#c85a42',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.examService.deleteExam(examId).subscribe({
          next: () => {
            // Recargar la lista de exámenes después de eliminar
            this.loadExams();
            Swal.fire({
              title: '¡Eliminado!',
              text: `El examen ha sido eliminado.`,
              icon: 'success',
            });
          },
          error: (error) => {
            console.error('Error al eliminar el examen:', error);
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al eliminar el examen. Inténtalo de nuevo más tarde.',
              icon: 'error',
            });
          },
        });
      }
    });
  }
}
