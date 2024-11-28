import { Component, OnInit } from '@angular/core';
import { Concert } from 'src/app/models/concert.model';
import { ConcertService } from 'src/app/services/concerts/concert.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-concert-admin',
  templateUrl: './concert-admin.component.html',
  // styleUrls: ['./concert-admin.component.scss']
})
export class ConcertAdminComponent implements OnInit {
  currentList: Concert[] = [];

  constructor(private concertService: ConcertService) {}

  ngOnInit(): void {
    this.loadConcerts();
  }

  loadConcerts(): void {
    this.concertService.getConcerts().subscribe((data: any) => {
      this.currentList = Array.isArray(data.Concerts) ? data.Concerts : [];
    });
  }

  deleteConcert(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este concierto?')) {
      this.concertService.deleteConcert(id).subscribe({
        next: () => {
          this.currentList = this.currentList.filter(
            (concert) => concert.id !== id
          );
          alert('Concierto eliminado correctamente');
        },
        error: (error) => {
          console.error('Error eliminando el concierto:', error);
          alert(
            'Hubo un problema al eliminar el concierto. Inténtalo de nuevo más tarde.'
          );
        },
      });
    }
  }
}
