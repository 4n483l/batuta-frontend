import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [
    {
      id: 1,
      subject: 'Matemáticas',
      teacher: 'Juan Pérez',
      classroom: 'A101',
      date: '2024-10-09',
      hour: '10:00',
    },
    {
      id: 2,
      subject: 'Historia',
      teacher: 'María Gómez',
      classroom: 'B202',
      date: '2024-10-30',
      hour: '11:30',
    },
    {
      id: 3,
      subject: 'Química',
      teacher: 'Lucía Fernández',
      classroom: 'C303',
      date: '2024-11-01',
      hour: '09:00',
    },
    {
      id: 4,
      subject: 'Biología',
      teacher: 'Carlos Martínez',
      classroom: 'D404',
      date: '2024-11-02',
      hour: '14:00',
    },
    {
      id: 5,
      subject: 'Física',
      teacher: 'Ana López',
      classroom: 'E505',
      date: '2024-11-03',
      hour: '12:30',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
