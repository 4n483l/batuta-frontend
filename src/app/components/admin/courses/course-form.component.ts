import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/courses/course.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-courses-form',
  templateUrl: './course-form.component.html',
  styleUrls: ['./course-admin.component.scss'],
})
export class CourseFormComponent implements OnInit {
  course: Course = {
    id: 0,
    subject: '',
    instrument: '',
    user: '',
    classroom: '',
    date: '',
    hour: '',
  };

  isEditMode: boolean = false;
  isLoading: boolean = true;

  constructor(
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const courseId = params['id'];
      if (courseId) {
        this.courseService.getCourseById(courseId).subscribe((data: Course) => {
          this.course = data;
          this.isEditMode = true;
          this.isLoading = false;
        });
      } else {
        this.isLoading = false;
      }
    });
  }

  saveCourse(): void {
    if (this.course.id === 0) {
      this.courseService.createCourse(this.course).subscribe(() => {
        this.router.navigate(['/admin/course-admin']);
      });
    } else {
      this.courseService.updateCourse(this.course).subscribe(() => {
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
