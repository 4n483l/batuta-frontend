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
    this.concertService.getConcerts().subscribe((data: any) => {
      this.concerts = Array.isArray(data.Concerts) ? data.Concerts : [];
      console.log('Componente concerts:', this.concerts);
    });
  }
}
