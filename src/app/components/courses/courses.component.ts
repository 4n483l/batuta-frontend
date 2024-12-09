import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CourseService } from 'src/app/services/courses/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  coursesList: Course[] = [];

 // coursesByStudent: { [studentId: number]: Course[] } = {};
  userType: string = '';
  isLoggedIn: boolean = false;

  isLoading: boolean = true;

  constructor(
    private courseService: CourseService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUserType();
  }

  loadUserType(): void {
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;

      if (this.isLoggedIn) {
        this.authService.getUserData().subscribe((userData) => {
          this.userType = userData.user_type;
          this.loadCourses();
        });
      }
    });
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe(
      (data: any) => {
        console.log('Datos de los cursos:', data);

if(this.userType === 'teacher'){
  this.coursesList = data.CoursesTeacher;
}else{
  this.coursesList = [];

  for(let studentId in data.CoursesStudent){
    const studentCourses = data.CoursesStudent[studentId];

    studentCourses.forEach((course: Course) => {
      this.coursesList.push(course);
    });
  }
}
this.isLoading = false;

        console.log('Cursos obtenidos:', this.coursesList);
        
      },
      (error) => {
        console.error('Error al cargar cursos', error);
        this.isLoading = false;
      }
    );
  }
}
