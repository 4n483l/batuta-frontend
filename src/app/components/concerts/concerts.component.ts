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
 // filteredConcerts: Concert[] = [];
  isLoading: boolean = true;
 // searchTerm: string = '';

  constructor(private concertService: ConcertService) {}

  ngOnInit(): void {
    this.concertService.getConcerts().subscribe(
      (data: any) => {
        this.concerts = Array.isArray(data.Concerts) ? data.Concerts : [];
        this.isLoading = false;
      },
      (error) => {
        //  console.error('Error al cargar conciertos', error);
        this.isLoading = false;
      }
    );
  }

 /*  filterConcerts(): void {
    const searchTermLower = this.searchTerm.toLowerCase();
    if (this.searchTerm.trim() === '') {
      this.filteredConcerts = [...this.concerts]; // Si no hay término de búsqueda, muestra todos
    } else {
      this.filteredConcerts = this.concerts.filter(
        (concert) =>
          concert.title.toLowerCase().includes(searchTermLower) ||
          concert.place.toLowerCase().includes(searchTermLower)
      );
    }
  } */
}
