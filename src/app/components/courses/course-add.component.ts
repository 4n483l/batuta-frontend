import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/courses/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { InstrumentService } from 'src/app/services/instruments/instrument.service';
import { SubjectService } from 'src/app/services/subjects/subject.service';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-course-add',
  templateUrl: './course-add.component.html',
  styleUrls: ['./courses.component.scss'],
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
  isTeacherLoading: boolean = true;
  isInstrumentLoading: boolean = true;
  isSubjectLoading: boolean = true;

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

    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.isEditMode = true;
      this.loadCourse(Number(courseId));
    } else {
      this.isEditMode = false;
    }

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

  loadCourse(courseId: number): void {
    this.courseService.getCourseById(courseId).subscribe(
      (response: any) => {
        this.course = response.course;
      },
      (error) => {
        console.error('Error al cargar el curso:', error);
      }
    );
  }

  loadInstruments(): void {
    this.instrumentService.getInstruments().subscribe((data: any) => {
      if (Array.isArray(data.instruments)) {
        this.instrumentos = data.instruments;
        this.isInstrumentLoading = false;
      } else {
        console.error('La respuesta no es un array', data.instruments);
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
        console.error('La respuesta no es un array', data.subjects);
        this.isSubjectLoading = false;
      }
    });
  }

  saveCourse(): void {
    if (this.isEditMode) {
      this.courseService.updateCourse(this.course).subscribe(() => {
        alert('Curso actualizado con éxito');
        this.router.navigate(['/courses']);
      });
    } else {
      this.courseService.createCourse(this.course).subscribe(() => {
        alert('Curso creado con éxito');

        this.router.navigate(['/courses']);
      });
    }
  }

  disableInstrumentSelect() {
    if (this.course.subject_id) {
      this.course.instrument_id = '';
    }
  }
  disableSubjectSelect() {
    if (this.course.instrument_id) {
      this.course.subject_id = '';
    }
  }
  closeForm(): void {
    this.router.navigate(['/courses']);
  }
}
