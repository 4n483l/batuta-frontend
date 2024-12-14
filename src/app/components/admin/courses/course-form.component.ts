import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/courses/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teachers/teacher.service';
import { InstrumentService } from 'src/app/services/instruments/instrument.service';
import { SubjectService } from 'src/app/services/subjects/subject.service';
import Swal from 'sweetalert2';

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

  isTeacherLoading: boolean = true;
  isInstrumentLoading: boolean = true;
  isSubjectLoading: boolean = true;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private teacherService: TeacherService,
    private instrumentService: InstrumentService,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    const courseId = this.route.snapshot.paramMap.get('id');
    if (courseId) {
      this.isEditMode = true;
      this.loadCourse(Number(courseId));
    } else {
      this.isEditMode = false;
    }

    this.loadTeachers();
    this.loadInstruments();
    this.loadSubjects();
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

  loadTeachers(): void {
    this.teacherService.getTeachers().subscribe(
      (response) => {
        this.teachers = response.Teachers;
        this.isTeacherLoading = false;
      },
      (error) => {
     console.error('Error al cargar los profesores:', error);
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

  saveCourse(): void {
    if (this.isEditMode) {
      this.courseService.updateCourse(this.course).subscribe(
        () => {
          Swal.fire({
            title: 'Curso actualizado con éxito',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          });
          this.router.navigate(['/admin/course-admin']);
        },
        (error) => {
          Swal.fire({
            title: 'Error al actualizar el curso',
            text: 'Hubo un problema al actualizar el curso.',
            icon: 'error',
          });
          this.router.navigate(['/admin/course-admin']);
        }
      );
    } else {
      this.courseService.createCourse(this.course).subscribe(
        () => {
          Swal.fire({
            title: 'Curso creado con éxito',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          });
          this.router.navigate(['/admin/course-admin']);
        },
        (error) => {
          Swal.fire({
            title: 'Error al crear el curso',
            text: 'Hubo un problema al crear el curso.',
            icon: 'error',
          });
        }
      );
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
        this.router.navigate(['/admin/course-admin']);
      }
    });
  }
}
