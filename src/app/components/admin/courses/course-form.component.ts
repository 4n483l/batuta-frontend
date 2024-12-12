import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/courses/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teachers/teacher.service';
import { InstrumentService } from 'src/app/services/instruments/instrument.service';
import { SubjectService } from 'src/app/services/subjects/subject.service';


@Component({
  selector: 'app-courses-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-admin.component.scss'],
})
export class CourseFormComponent implements OnInit {
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
    private teacherService: TeacherService,
    private instrumentService: InstrumentService,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.loadTeachers();
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
  loadTeachers(): void {
    this.teacherService.getTeachers().subscribe(
      (response) => {
        this.teachers = response.Teachers;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar los profesores:', error);
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
        this.router.navigate(['/admin/course-admin']);
      });
    } else {
      this.courseService.createCourse(this.course).subscribe(() => {
        console.log('Curso creado:', this.course);

        this.router.navigate(['/admin/course-admin']);
      });
    }
  }


  disableInstrumentOnSubject() {
    if (this.course.subject ) {
      this.course.instrument = '';
    }
  }
  disableSubjectOnInstrument() {
    if (this.course.instrument) {
      this.course.subject = '';
    }
  }

  closeForm(): void {
    this.router.navigate(['/admin/course-admin']);
  }
}
