import { Component, OnInit } from '@angular/core';
import { Exam } from 'src/app/models/exam.model';
import { ExamService } from 'src/app/services/exams/exam.service';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss'],
})
export class ExamsComponent implements OnInit {
  exams: Exam[] = [];
  isLoading: boolean = true;

  constructor(private examService: ExamService) {}

  ngOnInit(): void {
    this.examService.getExams().subscribe(
      (data: any) => {
        this.exams = Array.isArray(data.Exams) ? data.Exams : [];
        this.isLoading = false;

        console.log('Componente exams:', this.exams);
      },
      (error) => {
        console.error('Error al cargar exámenes', error);
        this.isLoading = false;
      }
    );
  }
}
