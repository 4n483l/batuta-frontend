import { Component, OnInit } from '@angular/core';
import { ConcertService } from 'src/app/services/concerts/concert.service';
import { Concert } from 'src/app/models/concert.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  concerts: Concert[] = [];
  chunkedConcerts: Concert[][] = [];
  isLoading: boolean = true;

  constructor(private concertService: ConcertService) {}

  ngOnInit(): void {
    this.loadConcerts();
  }

  loadConcerts() {
    this.concertService.getConcerts().subscribe(
      (data: any) => {
        this.concerts = Array.isArray(data.Concerts) ? data.Concerts : [];
        this.chunkConcerts();
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar conciertos:', error);
        this.isLoading = false;
      }
    );
  }

  chunkConcerts() {
    const chunkSize = 3;
    this.chunkedConcerts = [];
    for (let i = 0; i < this.concerts.length; i += chunkSize) {
      this.chunkedConcerts.push(this.concerts.slice(i, i + chunkSize));
    }
  }
}
