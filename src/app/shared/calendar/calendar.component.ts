import { Component, Input, OnInit } from '@angular/core';
import { Concert } from 'src/app/models/concert.model';
import { Rehearsal } from 'src/app/models/rehearsal.model';
import { Exam } from 'src/app/models/exam.model';
import { Course } from 'src/app/models/course.model';

type EventType = Concert | Rehearsal | Exam | Course;

// Guardas de tipo para cada tipo de evento
function isConcert(event: EventType): event is Concert {
  return (event as Concert).title !== undefined;
}

function isRehearsal(event: EventType): event is Rehearsal {
  return (event as Rehearsal).place !== undefined;
}

function isExam(event: EventType): event is Exam {
  return (
    (event as Exam).subject !== undefined ||
    (event as Exam).teacher !== undefined
  );
}

function isCourse(event: EventType): event is Course {
  return (event as Course).classroom !== undefined;
}

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {
  @Input() events: EventType[] = [];
  @Input() title: string = '';
 // @Input() searchTerm: string = '';

  currentYear: number;
  currentMonth: number;
  daysInMonth: number[] = [];
  firstDayOfWeek: number = 0;
  currentMonthName: string = '';

  searchTerm: string = '';
  filteredEvents: EventType[] = [];

  constructor() {
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth(); // Mes actual (0 = enero, 11 = diciembre)
    this.currentMonthName = this.capitalizeFirstLetter(
      today.toLocaleString('es-ES', { month: 'long' })
    );
  }
  ngOnInit(): void {
    if (this.events && this.events.length > 0) {
      this.generateCalendar();

      this.filteredEvents = [...this.events];
    }
  }
/*   ngOnChanges() {
    this.filterEvents();
  } */

  generateCalendar() {
    const firstDay = new Date(this.currentYear, this.currentMonth, 1);
    this.firstDayOfWeek = firstDay.getDay() === 0 ? 6 : firstDay.getDay() - 1; // asegura que el lunes sea el primer día de la semana
    this.daysInMonth = Array.from(
      {
        length: new Date(this.currentYear, this.currentMonth + 1, 0).getDate(),
      },
      (_, i) => i + 1
    );
  }
  // Método que filtra eventos de un día dado
  getEventsForDay(day: number): any[] {
    const dateString = `${this.currentYear}-${String(
      this.currentMonth + 1
    ).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

    // return this.events.filter((event) => event.date === dateString);

    return this.filteredEvents.filter((event) => event.date === dateString);
  }

  // TODO: Implementar búsqueda de eventos
/*   filterEvents(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    if (this.searchTerm.trim() === '') {
      this.filteredEvents = [...this.events]; // Si no hay búsqueda, mostrar todos
    } else {
      this.filteredEvents = this.events.filter((event) =>
        this.matchesSearchTerm(event, searchTermLower)
      );
    }
  }
  matchesSearchTerm(event: EventType, searchTerm: string): boolean {
    const searchTermLower = searchTerm.toLowerCase();

    if (isConcert(event)) {
      return (
        (typeof event.title === 'string' &&
          event.title.toLowerCase().includes(searchTermLower)) ||
        (typeof event.place === 'string' &&
          event.place.toLowerCase().includes(searchTermLower))
      );
    }

    if (isRehearsal(event)) {
      return (
        (typeof event.place === 'string' &&
          event.place.toLowerCase().includes(searchTermLower)) ||
        (typeof event.date === 'string' &&
          event.date.toLowerCase().includes(searchTermLower)) ||
        (typeof event.hour === 'string' &&
          event.hour.toLowerCase().includes(searchTermLower))
      );
    }

    if (isExam(event)) {
      return (
        (typeof event.subject === 'string' &&
          event.subject.toLowerCase().includes(searchTermLower)) ||
        (typeof event.teacher === 'string' &&
          event.teacher.toLowerCase().includes(searchTermLower)) ||
        (typeof event.classroom === 'string' &&
          event.classroom.toLowerCase().includes(searchTermLower))
      );
    }

    if (isCourse(event)) {
      return (
        (typeof event.subject === 'string' &&
          event.subject.toLowerCase().includes(searchTermLower)) ||
        (typeof event.instrument === 'string' &&
          event.instrument.toLowerCase().includes(searchTermLower)) ||
        (typeof event.classroom === 'string' &&
          event.classroom.toLowerCase().includes(searchTermLower))
      );
    }

    return false; // Si el evento no coincide con ninguna condición
  } */

  changeMonth(offset: number) {
    this.currentMonth += offset;

    if (this.currentMonth < 0) {
      this.currentMonth = 11;
      this.currentYear--;
    } else if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.updateMonthName();
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
