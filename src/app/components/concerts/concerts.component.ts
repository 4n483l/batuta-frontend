import { Component, OnInit } from '@angular/core';

export interface Concert {
  id: number;
  title: string;
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
      title: 'Lee Smitham',
      place: 'Port Leannshire',
      date: '2024-10-06',
      hour: '01:41:14',
    },
    {
      id: 2,
      title: 'Lourdes Schroeder',
      place: 'Port Marcella',
      date: '1996-02-15',
      hour: '03:47:39',
    },
    {
      id: 3,
      title: 'Isabelle Nicolas DDS',
      place: 'Port Bryonside',
      date: '2023-02-07',
      hour: '01:40:23',
    },
    // Resto de los conciertos...
  ];



  constructor() {

  }

  ngOnInit(): void {

  }

}
