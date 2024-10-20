import { Component } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { addHours, startOfDay, addDays } from 'date-fns';

@Component({
  selector: 'app-concerts',
  templateUrl: './concerts.component.html',
  styleUrls: ['./concerts.component.css'],
})
export class ConcertsComponent {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [
    {
      start: addHours(startOfDay(new Date()), 2),
      title: 'Concierto de Rock',
    },
    {
      start: addHours(startOfDay(new Date()), 5),
      title: 'Concierto de Jazz',
    },
  ];

  CalendarView = CalendarView;

  addDays(date: Date, days: number): Date {
    return addDays(date, days);
  }
}
