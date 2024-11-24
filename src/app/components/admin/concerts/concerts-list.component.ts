import { Component, OnInit } from '@angular/core';
import { Concert } from 'src/app/models/concert.model';
import { ConcertService } from 'src/app/services/concerts/concert.service';

@Component({
  selector: 'app-concerts-list',
  templateUrl: './concerts-list.component.html',
  styleUrls: ['../admin.component.scss'],
})
export class ConcertsListComponent implements OnInit {
  concerts: Concert[] = [];
  selectedConcert: Concert | null = null;
  isFormVisible: boolean = false;

  constructor(private concertService: ConcertService) {}

  ngOnInit(): void {
    this.loadConcerts();
  }

  loadConcerts(): void {
    this.concertService.getConcerts().subscribe(
      (data: Concert[]) => {
        this.concerts = data;
      },
      (error) => {
        console.error('Error fetching concerts', error);
      }
    );
  }

  editarConcert(concert: Concert): void {
    this.selectedConcert = { ...concert };
  }

  deleteConcert(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este concierto?')) {
      this.concertService.deleteConcert(id).subscribe(
        () => {
          this.concerts = this.concerts.filter((concert) => concert.id !== id);
        },
        (error) => {
          console.error('Error al borrar el concierto:', error);
        }
      );
    }
  }

  abrirFormulario(): void {
    // Asegurarse de que no haya un concierto seleccionado
    this.selectedConcert = null;
    this.isFormVisible = true;
  }

  cerrarFormulario(): void {
    this.isFormVisible = false; 
  }
}
