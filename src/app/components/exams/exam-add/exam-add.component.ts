import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { ActivatedRoute, Router } from '@angular/router';
import { InstrumentService } from 'src/app/services/instruments/instrument.service';
import { SubjectService } from 'src/app/services/subjects/subject.service';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ExamService } from 'src/app/services/exams/exam.service';

@Component({
  selector: 'app-exam-add',
  templateUrl: './exam-add.component.html',
  styleUrls: ['./exam-add.component.scss'],
})
export class ExamAddComponent implements OnInit {
  exam: any = {
    subject_id: null,
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
  isLoading: boolean = true;
  isLoadingTeachers: boolean = true;

  constructor(
    private examService: ExamService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private instrumentService: InstrumentService,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.authService.getUserData().subscribe((userData) => {
      this.exam.user_id = userData.id;
    });

    this.loadInstruments();
    this.loadSubjects();

    /*     this.route.params.subscribe((params) => {
      const courseId = params['id'];
      if (courseId) {
        this.loadCourse(courseId);
      } else {
        this.isLoading = false;
      }
    }); */
  }

  /*   loadExam(courseId: number): void {
    this.isLoading = true;
    this.courseService.getCourseById(courseId).subscribe(
      (data: any) => {
        const course: Course = data.course;
        this.course = course;

        console.log('Curso cargado:', this.course);
        this.isEditMode = true;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar el curso:', error);
        this.isLoading = false;
      }
    );
  } */

  loadInstruments(): void {
    this.instrumentService.getInstruments().subscribe((data: any) => {
      if (Array.isArray(data.instruments)) {
        this.instrumentos = data.instruments;
      } else {
        console.error('La respuesta no es un array', data.instruments);
      }
    });
  }
  loadSubjects(): void {
    this.subjectService.getSubjects().subscribe((data: any) => {
      this.asignaturas = data.subjects;
      this.isLoading = false;
    });
  }

  saveExam(): void {
    this.examService.createExam(this.exam).subscribe(() => {
      console.log('Curso creado:', this.exam);
      console.log('User id:', this.exam.user_id);

      this.router.navigate(['/exams']);
    });
  }

  disableInstrumentOnSubject() {
    if (this.exam.subject) {
      this.exam.instrument = '';
    }
  }
  disableSubjectOnInstrument() {
    if (this.exam.instrument) {
      this.exam.subject = '';
    }
  }

  closeForm(): void {
    this.router.navigate(['/exams']);
  }
}
