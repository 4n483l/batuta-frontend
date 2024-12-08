import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamService } from 'src/app/services/exams/exam.service';


@Component({
  selector: 'app-exam-admin',
  templateUrl: './exam-admin.component.html',
  styleUrls: ['./exam-admin.component.scss'],
})
export class ExamAdminComponent implements OnInit {
  exams: any[] = []; // Lista completa de exámenes
  currentList: any[] = []; // Lista actual visible
  isLoading: boolean = false;

  constructor(private examService: ExamService, private router: Router) {}

  ngOnInit(): void {
    this.loadExams();
  }

  loadExams(): void {
    this.isLoading = true;
    this.examService.getExams().subscribe(
      (response: any) => {
        this.exams = response.Exams || [];
        this.currentList = this.exams; // Puedes implementar paginación o filtros aquí
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar exámenes:', error);
        this.isLoading = false;
      }
    );
  }

  // Método para eliminar un examen
  deleteExam(examId: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este examen?')) {
      this.examService.deleteExam(examId).subscribe(
        () => {
          alert('Examen eliminado correctamente');
          this.loadExams(); // Recargar la lista después de eliminar
        },
        (error) => {
          console.error('Error al eliminar el examen:', error);
        }
      );
    }
  }
}
