import { Component } from '@angular/core';

export interface Exam {
  id: number;
  subject: string;
  teacher: string;
  date: string; // formato: "YYYY-MM-DD"
  hour: string;
  classroom: string;
}

@Component({
  selector: 'app-exams',
  templateUrl: './exams.component.html',
  styleUrls: ['./exams.component.scss'],
})
export class ExamsComponent {
  exams: Exam[] = [
    {
      id: 1,
      subject: 'Math',
      teacher: 'Mr. Smith',
      date: '2024-10-01',
      hour: '10:00',
      classroom: 'A',
    },
    {
      id: 2,
      subject: 'History',
      teacher: 'Mrs. Brown',
      date: '2024-09-01',
      hour: '15:00',
      classroom: 'B',
    },
    {
      id: 3,
      subject: 'Biology',
      teacher: 'Mr. Johnson',
      date: '2023-12-02',
      hour: '11:30',
      classroom: 'C',
    },
    {
      id: 4,
      subject: 'Chemistry',
      teacher: 'Mrs. Wilson',
      date: '2024-11-03',
      hour: '09:00',
      classroom: 'D',
    },
    {
      id: 5,
      subject: 'Physics',
      teacher: 'Mr. Davis',
      date: '2024-11-04',
      hour: '14:00',
      classroom: 'E',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
