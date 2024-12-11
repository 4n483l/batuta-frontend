import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/courses/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { TeacherService } from 'src/app/services/teachers/teacher.service';
import { Subject } from 'src/app/models/subject.model';
import { Instrument } from 'src/app/models/instrument.model';

@Component({
  selector: 'app-courses-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-admin.component.scss'],
})
export class CourseFormComponent implements OnInit {
  course: any = {
    id: 0,
    subject: null,
    instrument: '',
    user_id: '',
    classroom: '',
    date: '',
    hour: '',
  };
  teachers: any[] = [];

  isEditMode: boolean = false;
  isLoading: boolean = true;
  isLoadingTeachers: boolean = true;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router,
    private teacherService: TeacherService
  ) {}

  ngOnInit(): void {
 this.loadTeachers();
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
      (data: Course) => {
        this.course = data;
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

  saveCourse(): void {
    if (this.isEditMode) {
      this.courseService.updateCourse(this.course).subscribe(() => {
        this.router.navigate(['/admin/course-admin']);
      });
    } else {
      this.courseService.createCourse(this.course).subscribe(() => {
        this.router.navigate(['/admin/course-admin']);
      });
    }
  }

  closeForm(): void {
    this.router.navigate(['/admin/course-admin']);
  }

  // Deshabilitar el campo "instrument" cuando se llena el campo "subject"
  disableInstrumentOnSubject() {
    if (this.course.subject) {
      this.course.instrument = '';
    }
  }

  // Deshabilitar el campo "subject" cuando se llena el campo "instrument"
  disableSubjectOnInstrument() {
    if (this.course.instrument) {
      this.course.subject = '';
    }
  }
}
