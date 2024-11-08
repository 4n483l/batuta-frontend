import { Component, OnInit } from '@angular/core';
import { Concert } from 'src/app/models/concert.model';
import { ConcertService } from 'src/app/services/concerts/concert.service';

@Component({
  selector: 'app-concerts',
  templateUrl: './concerts.component.html',
  styleUrls: ['./concerts.component.scss'],
})
export class ConcertsComponent implements OnInit {
  concerts: Concert[] = [];

  constructor(private concertService: ConcertService) {}

  ngOnInit(): void {
    // Obtener los conciertos desde la API
 this.concertService.getConcerts().subscribe({
   next: (data) => {
     this.concerts = Array.isArray(data) ? data : [data];
     console.log('Concerts fetched:', this.concerts);
   },
   error: (err) => console.error('Error fetching concerts:', err),
 });
  }
}
