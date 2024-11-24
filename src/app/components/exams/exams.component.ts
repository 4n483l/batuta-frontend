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

  constructor(private examService: ExamService) {}

  ngOnInit(): void {
    this.examService.getExams().subscribe((data: any) => {
      this.exams = Array.isArray(data.Exams) ? data.Exams : [];
      console.log('Componente exams:', this.exams);
    });
  }
}
