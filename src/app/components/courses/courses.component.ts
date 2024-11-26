import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/courses/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];
  isLoading: boolean = true;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe((data: any) => {
      this.courses = Array.isArray(data.Courses) ? data.Courses : [];
      this.isLoading = false;

      console.log('Componente courses:', this.courses);
    },
    (error) => {
      console.error('Error al cargar cursos', error);
      this.isLoading = false;
    }
  );
  }
}
