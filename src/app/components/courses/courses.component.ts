import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/courses/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  coursesList: Course[] = [];
  coursesByStudent: { [studentId: number]: Course[] } = {};
  isLoading: boolean = true;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe(
      (data: any) => {
        // trae los cusros por estudiante
        this.coursesByStudent = data.Courses;

        // agrupa todos los cursos de estudiantes
       // this.coursesList = Object.values(this.coursesByStudent).flat();

       // this.coursesList = Array.isArray(data.Courses) ? data.Courses : [];


        this.isLoading = false;
        console.log('Componente courses:', data);
        console.log('Cursos por estudiante:', this.coursesByStudent);
      },
      (error) => {
        console.error('Error al cargar cursos', error);
        this.isLoading = false;
      }
    );
  }
}
