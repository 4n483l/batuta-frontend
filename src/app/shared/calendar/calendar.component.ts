import { Component, Input, OnInit } from '@angular/core';
import { Concert } from 'src/app/components/concerts/concerts.component';
import { Rehearsal } from 'src/app/components/rehearsals/rehearsals.component';
//import { Exam } from 'src/app/components/exams/exams.component';
//import { Class } from 'src/app/components/classes/classes.component';

type EventType = Concert | Rehearsal/*  | Exam | Class */;

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  getEventsForDay(day: number): any[] {
    const dateString = `${this.currentYear}-${String(
      this.currentMonth + 1
    ).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return this.events.filter((event) => event.date === dateString);
  }
  @Input() events: EventType[] = [];
  currentYear: number;
  currentMonth: number;
  daysInMonth: number[] = [];
  firstDayOfWeek: number = 0;
  currentMonthName: string = '';

  constructor() {
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth(); // Mes actual (0 = enero, 11 = diciembre)
    this.currentMonthName = this.capitalizeFirstLetter(
      today.toLocaleString('es-ES', { month: 'long' })
    );
  }

  ngOnInit(): void {
    this.generateCalendar();
  }

  generateCalendar() {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    this.firstDayOfWeek = firstDay.getDay(); // Primer día del mes (0 = domingo, 6 = sábado)
    this.daysInMonth = Array.from(
      {
        length: new Date(this.currentYear, this.currentMonth + 1, 0).getDate(),
      },
      (_, i) => i + 1
    );
  }
  // Método que filtra eventos de un día dado
  getConcertsForDay(day: number): EventType[] {
    const dateString = `${this.currentYear}-${String(
      this.currentMonth + 1
    ).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return this.events.filter((event) => event.date === dateString);
  }

  changeMonth(offset: number) {
    this.currentMonth += offset;
    this.updateMonthName();
    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.generateCalendar();
  }

  private capitalizeFirstLetter(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1);
  }

  private updateMonthName() {
    this.currentMonthName = this.capitalizeFirstLetter(
      new Date(this.currentYear, this.currentMonth, 1).toLocaleString('es-ES', {
        month: 'long',
      })
    );
  }
}
