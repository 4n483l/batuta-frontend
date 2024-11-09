import { Component, OnInit } from '@angular/core';
import { Concert } from 'src/app/models/concert.model';
import { EventService } from 'src/app/services/eventos/event.service';

@Component({
  selector: 'app-concerts',
  templateUrl: './concerts.component.html',
  styleUrls: ['./concerts.component.scss'],
})
export class ConcertsComponent implements OnInit {
  concerts: Concert[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit(): void {
    this.eventService.getConcerts().subscribe((data: any) => {
      this.concerts = Array.isArray(data.Concerts) ? data.Concerts : [];
      console.log('Componente concerts:', this.concerts);
    });
  }
}
