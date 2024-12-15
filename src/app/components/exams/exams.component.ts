import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Exam } from 'src/app/models/exam.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ExamService } from 'src/app/services/exams/exam.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss'],
})
export class ExamsComponent implements OnInit {
  examsList: Exam[] = [];

  userType: string = '';
  isLoggedIn: boolean = false;

  isLoading: boolean = true;
  viewNotes: boolean = false;

  constructor(
    private examService: ExamService,
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
          this.loadExams();
        });
      }
    });
  }

  ngAfterViewInit(): void {
    if (this.router.url.includes('exams')) {
      this.loadExams();
    }
  }

  loadExams() {
    this.examService.getExams().subscribe(
      (data: any) => {
        if (this.userType === 'teacher') {
          this.examsList = data.ExamsTeacher;
        } else {
          this.examsList = [];

          for (let studentId in data.ExamsStudent) {
            const studentExams = data.ExamsStudent[studentId];

            studentExams.forEach((exam: Exam) => {
              this.examsList.push(exam);
            });
          }
        }
        this.isLoading = false;

        if (this.viewNotes && this.examsList.length === 0) {
          Swal.fire({
            title: 'No hay exámenes disponibles',
            text: 'Parece que no tienes exámenes asignados.',
            icon: 'info',
            timer: 1500,
            confirmButtonColor: '#4b6584',
            showConfirmButton: false,
          });
        }
      },
      (error) => {
        this.isLoading = false;
        //console.error('Error al obtener los exámenes:', error);
      }
    );
  }
}
