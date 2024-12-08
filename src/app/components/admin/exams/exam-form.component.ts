import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from 'src/app/services/exams/exam.service';


@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-admin.component.scss'],
})
export class ExamFormComponent implements OnInit {
  exam: any = {}; // Datos del examen
  isEditMode: boolean = false; // Modo edición
  isLoading: boolean = false; // Estado de carga

  constructor(
    private examService: ExamService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const examId = this.route.snapshot.paramMap.get('id');
    if (examId) {
    //  this.isEditMode = true;
     // this.loadExam(examId);
    } else {
      this.isEditMode = false;
    }
  }

  // Método para cargar un examen específico
/*   loadExam(examId: string): void {
    this.isLoading = true;
    this.examService.getExamById(examId).subscribe(
      (response: any) => {
        this.exam = response.Exam;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar el examen:', error);
        this.isLoading = false;
      }
    );
  } */

  // Método para guardar el examen
/*   saveExam(): void {
    if (this.isEditMode) {
      this.examService.updateExam(this.exam.id, this.exam).subscribe(
        (response) => {
          alert('Examen actualizado correctamente');
          this.router.navigate(['/admin/exam-admin']);
        },
        (error) => {
          console.error('Error al actualizar el examen:', error);
        }
      );
    } else {
      this.examService.createExam(this.exam).subscribe(
        (response) => {
          alert('Examen creado correctamente');
          this.router.navigate(['/admin/exam-admin']);
        },
        (error) => {
          console.error('Error al crear el examen:', error);
        }
      );
    }
  } */

  // Método para cancelar y volver al listado
  closeForm(): void {
    this.router.navigate(['/admin/exam-admin']);
  }
}
