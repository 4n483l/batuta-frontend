import { Component, OnInit } from '@angular/core';
import { ConcertService } from 'src/app/services/concerts/concert.service';
import { RehearsalService } from 'src/app/services/rehearsals/rehearsal.service';
import { CourseService } from 'src/app/services/courses/course.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  currentList: any[] = [];

  constructor(
   
  ) {}

  ngOnInit(): void {

  }

}
