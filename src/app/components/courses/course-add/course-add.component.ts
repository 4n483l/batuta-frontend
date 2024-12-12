import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/courses/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teachers/teacher.service';
import { InstrumentService } from 'src/app/services/instruments/instrument.service';
import { SubjectService } from 'src/app/services/subjects/subject.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./course-add.component.scss'],
})
export class CourseAddComponent implements OnInit {
  course: any = {
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
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private instrumentService: InstrumentService,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.authService.getUserData().subscribe((userData) => {
      this.course.user_id = userData.id;
    });

    this.loadInstruments();
    this.loadSubjects();

    this.route.params.subscribe((params) => {
      const courseId = params['id'];
      if (courseId) {
        this.loadCourse(courseId);
      } else {
        this.isLoading = false;
      }
    });
  }

  loadCourse(courseId: number): void {
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
  }

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
    });
  }

  saveCourse(): void {
    if (this.isEditMode) {
      this.courseService.updateCourse(this.course).subscribe(() => {
        this.router.navigate(['/courses']);
      });
    } else {
      this.courseService.createCourse(this.course).subscribe(() => {
        console.log('Curso creado:', this.course);
        console.log('User id:', this.course.user_id);

        this.router.navigate(['/courses']);
      });
    }
  }

  disableInstrumentOnSubject() {
    if (this.course.subject) {
      this.course.instrument = '';
    }
  }
  disableSubjectOnInstrument() {
    if (this.course.instrument) {
      this.course.subject = '';
    }
  }

  closeForm(): void {
    this.router.navigate(['/courses']);
  }
}
