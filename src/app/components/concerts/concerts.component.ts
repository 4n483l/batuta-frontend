import { Component, OnInit } from '@angular/core';
import { Concert } from 'src/app/models/concert.model';
import { ConcertService } from 'src/app/services/concerts/concert.service';
import { EventService } from 'src/app/services/eventos/event.service';

@Component({
  selector: 'app-concerts',
  templateUrl: './concerts.component.html',
  styleUrls: ['./concerts.component.scss'],
})
export class ConcertsComponent implements OnInit {
  concerts: Concert[] = [];

  // constructor(private concertService: ConcertService) {}
  constructor(private eventService: EventService) {}

/*   ngOnInit(): void {
    this.eventService.getConcerts().subscribe((data: Concert[]) => {
      // this.concerts = data;
      this.concerts = Array.isArray(data) ? data : [data];
      console.log('Componente concerts:', this.concerts);
    });
  } */

  ngOnInit(): void {
    this.eventService.getConcerts().subscribe((data: any) => {
      // this.concerts = data;
      this.concerts = Array.isArray(data.Conciertos) ? data.Conciertos : [];
      console.log('Componente concerts:', this.concerts);
    });
  }
}
