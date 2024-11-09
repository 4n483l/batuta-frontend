import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { EventService } from 'src/app/services/eventos/event.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss'],
})
export class CoursesComponent implements OnInit {
  courses: Course[] = [];

  constructor(private eventService:EventService) {}

  ngOnInit(): void {
    this.eventService.getCourses().subscribe((data: any) => {
      this.courses = Array.isArray(data.Courses) ? data.Courses : [];
      console.log('Componente courses:', this.courses);
    });
  }
}
