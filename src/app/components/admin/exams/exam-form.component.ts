import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ExamService } from 'src/app/services/exams/exam.service';
import { TeacherService } from 'src/app/services/teachers/teacher.service';
import { InstrumentService } from 'src/app/services/instruments/instrument.service';
import { SubjectService } from 'src/app/services/subjects/subject.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exam-form',
  templateUrl: './exam-form.component.html',
  styleUrls: ['./exam-admin.component.scss'],
})
export class ExamFormComponent implements OnInit {
  exam: any = {
    subject_id: '',
    instrument_id: '',
    user_id: '',
    classroom: '',
    date: '',
    hour: '',
  };
  teachers: any[] = [];
  asignaturas: any[] = [];
  instrumentos: any[] = [];

  isEditMode: boolean = false;

  isTeacherLoading: boolean = true;
  isInstrumentLoading: boolean = true;
  isSubjectLoading: boolean = true;

  constructor(
    private examService: ExamService,
    private route: ActivatedRoute,
    private router: Router,
    private teacherService: TeacherService,
    private instrumentService: InstrumentService,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    const examId = this.route.snapshot.paramMap.get('id');
    if (examId) {
      this.isEditMode = true;
      this.loadExam(Number(examId));
    } else {
      this.isEditMode = false;
    }

    this.loadTeachers();
    this.loadInstruments();
    this.loadSubjects();
  }

  loadExam(examId: number): void {
    this.examService.getExamById(examId).subscribe(
      (response: any) => {
        this.exam = response.Exam;
      },
      (error) => {

      }
    );
  }

  loadTeachers(): void {
    this.teacherService.getTeachers().subscribe(
      (response) => {
        this.teachers = response.Teachers;
        this.isTeacherLoading = false;
      },
      (error) => {

        this.isTeacherLoading = false;
      }
    );
  }

  loadInstruments(): void {
    this.instrumentService.getInstruments().subscribe((data: any) => {
      if (Array.isArray(data.instruments)) {
        this.instrumentos = data.instruments;
        this.isInstrumentLoading = false;
      } else {

        this.isInstrumentLoading = false;
      }
    });
  }
  loadSubjects(): void {
    this.subjectService.getSubjects().subscribe((data: any) => {
      if (Array.isArray(data.subjects)) {
        this.asignaturas = data.subjects;
        this.isSubjectLoading = false;
      } else {

        this.isSubjectLoading = false;
      }
    });
  }

  // Método para guardar el examen
  saveExam(): void {
    if (this.isEditMode) {
      this.examService.updateExam(this.exam).subscribe(
        (response) => {
          Swal.fire({
            title: 'Examen actualizado correctamente',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            this.router.navigate(['/admin/exam-admin']);
            this.isTeacherLoading = false;
            this.isInstrumentLoading = false;
            this.isSubjectLoading = false;
          });
        },
        (error) => {
          console.error('Error al actualizar el examen:', error);
          Swal.fire({
            title: 'Error al actualizar el examen',
            text: 'Hubo un problema al actualizar el examen.',
            icon: 'error',
          }).then(() => {
            this.isTeacherLoading = false;
            this.isInstrumentLoading = false;
            this.isSubjectLoading = false;
          });
        }
      );
    } else {
      this.examService.createExam(this.exam).subscribe(
        () => {
          Swal.fire({
            title: 'Examen creado correctamente',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          }).then(() => {
            this.router.navigate(['/admin/exam-admin']);
            this.isTeacherLoading = false;
            this.isInstrumentLoading = false;
            this.isSubjectLoading = false;
          });
        },
        (error) => {
          console.error('Error al crear el examen:', error);
          Swal.fire({
            title: 'Error al crear el examen',
            text: 'Hubo un problema al crear el examen.',
            icon: 'error',
          }).then(() => {
            this.isTeacherLoading = false;
            this.isInstrumentLoading = false;
            this.isSubjectLoading = false;
          });
        }
      );
    }
  }

  disableInstrumentSelect() {
    if (this.exam.subject_id) {
      this.exam.instrument_id = '';
    }
  }
  disableSubjectSelect() {
    if (this.exam.instrument_id) {
      this.exam.subject_id = '';
    }
  }

  closeForm(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Si cancelas los cambios, se perderán.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4b6584',
      cancelButtonColor: '#c85a42',
      confirmButtonText: 'Sí, cancelar',
      cancelButtonText: 'No, volver',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/admin/exam-admin']);
      }
    });
  }
}
