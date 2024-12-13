import { Component, OnInit } from '@angular/core';
import { Exam } from 'src/app/models/exam.model';
import { AuthService } from 'src/app/services/auth/auth.service';
import { ExamService } from 'src/app/services/exams/exam.service';


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

  constructor(
    private examService: ExamService,
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
          this.loadExams();
        });
      }
    });
  }

  loadExams() {
    this.examService.getExams().subscribe(
      (data: any) => {
        console.log('Info todos exámenes:', data);

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

        console.log('Examenes obtenidos:', this.examsList);
      },
      (error) => {
        console.error('Error al cargar exámenes', error);
        this.isLoading = false;
      }
    );
  }
}
