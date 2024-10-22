/* import { Component } from '@angular/core';

@Component({
  selector: 'app-concerts',
  templateUrl: './concerts.component.html',
  styleUrls: ['./concerts.component.scss']
})
export class ConcertsComponent {

}
 */


import { Component, OnInit } from '@angular/core';

interface Concert {
  id: number;
  name: string;
  place: string;
  date: string; // formato: "YYYY-MM-DD"
  hour: string;
}

@Component({
  selector: 'app-concerts',
  templateUrl: './concerts.component.html',
  styleUrls: ['./concerts.component.scss'],
})
export class ConcertsComponent implements OnInit {
  concerts: Concert[] = [
    {
      id: 1,
      name: 'Lee Smitham',
      place: 'Port Leannshire',
      date: '2024-10-06',
      hour: '01:41:14',
    },
    {
      id: 2,
      name: 'Lourdes Schroeder',
      place: 'Port Marcella',
      date: '1996-02-15',
      hour: '03:47:39',
    },
    {
      id: 3,
      name: 'Isabelle Nicolas DDS',
      place: 'Port Bryonside',
      date: '2023-02-07',
      hour: '01:40:23',
    },
    // Resto de los conciertos...
  ];

  currentYear: number;
  currentMonth: number;
  daysInMonth: number[] = [];
  firstDayOfWeek: number = 0;
  currentMonthName: string = '';

  constructor() {
    const today = new Date();
    this.currentYear = today.getFullYear();
    this.currentMonth = today.getMonth(); // Mes actual (0 = enero, 11 = diciembre)
    this.currentMonthName = today.toLocaleString('es-ES', { month: 'long' });
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

  getConcertsForDay(day: number): Concert[] {
    const dateString = `${this.currentYear}-${String(
      this.currentMonth + 1
    ).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return this.concerts.filter((concert) => concert.date === dateString);
  }

  changeMonth(offset: number) {
    this.currentMonth += offset;
    this.currentMonthName = new Date(
      this.currentYear,
      this.currentMonth,
      1
    ).toLocaleString('es-ES', { month: 'long' });
    if (this.currentMonth < 0) {
      this.currentMonth = 11;

      this.currentYear--;
    } else if (this.currentMonth > 11) {
      this.currentMonth = 0;
      this.currentYear++;
    }
    this.generateCalendar();
  }
}
