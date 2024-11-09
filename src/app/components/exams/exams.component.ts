import { Component, OnInit } from '@angular/core';
import { Exam } from 'src/app/models/exam.model';
import { EventService } from 'src/app/services/eventos/event.service';

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss'],
})
export class ExamsComponent implements OnInit {
  exams: Exam[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getExams().subscribe((data: any) => {
      this.exams = Array.isArray(data.Exams) ? data.Exams : [];
      console.log('Componente exams:', this.exams);
    });
  }
}
