import { Component } from '@angular/core';

export interface Rehearsal {
  id: number;
  place: string;
  date: string; // formato: "YYYY-MM-DD"
  hour: string;
}

@Component({
  selector: 'app-rehearsals',
  templateUrl: './rehearsals.component.html',
  styleUrls: ['./rehearsals.component.scss'],
})
export class RehearsalsComponent {
  rehearsals: Rehearsal[] = [
    {
      id: 1,
      place: 'Sala de ensayo A',
      date: '2024-11-01',
      hour: '10:00',
    },
    {
      id: 2,
      place: 'Sala de ensayo B',
      date: '2024-09-01',
      hour: '15:00',
    },
    {
      id: 3,
      place: 'Sala de ensayo C',
      date: '2023-11-02',
      hour: '11:30',
    },
    {
      id: 4,
      place: 'Auditorio Principal',
      date: '2024-11-03',
      hour: '09:00',
    },
    {
      id: 5,
      place: 'Sala de ensayo A',
      date: '2024-11-04',
      hour: '14:00',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
