import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from 'src/app/models/course.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { CourseService } from 'src/app/services/courses/course.service';
import Swal from 'sweetalert2';

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
  viewNotes: boolean = false;

  constructor(
    private courseService: CourseService,
    private authService: AuthService,
    private router: Router
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
        });
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.router.url.includes('courses')) {
      this.loadCourses();
    }
  }

  loadCourses(): void {
    this.viewNotes = true;
    this.isLoading = true;

    this.courseService.getCourses().subscribe(
      (data: any) => {
        if (this.userType === 'teacher') {
          this.coursesList = data.CoursesTeacher;
        } else {
          this.coursesList = [];

          for (let studentId in data.CoursesStudent) {
            const studentCourses = data.CoursesStudent[studentId];

            studentCourses.forEach((course: Course) => {
              this.coursesList.push(course);
            });
          }
        }
        this.isLoading = false;

        if (this.viewNotes && this.coursesList.length === 0) {
          Swal.fire({
            title: 'No hay cursos disponibles',
            text: 'Parece que no tienes cursos asignados.',
            icon: 'info',
            timer: 1500,
            confirmButtonColor: '#4b6584',
            showConfirmButton: false,
          });
        }
      },
      (error) => {
        // console.error('Error al obtener los cursos:', error);
        this.isLoading = false;
      }
    );
  }
}
