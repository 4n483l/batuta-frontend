import { Component, Input, OnInit } from '@angular/core';
import { ConcertService } from 'src/app/services/concerts/concert.service';
import { Concert } from 'src/app/models/concert.model';

@Component({
  selector: 'app-concerts-form',
  templateUrl: './concerts-form.component.html',
  styleUrls: ['../admin.component.scss'],
})
export class ConcertsFormComponent implements OnInit {
  @Input() selectedConcert: Concert | null = null;

  concert: Concert = {
    id: 0,
    title: '',
    place: '',
    date: '',
    hour: '',
  };

  constructor(private concertService: ConcertService) {}

  ngOnInit(): void {
    if (this.selectedConcert) {
      this.concert = { ...this.selectedConcert };
    }
  }

  saveConcert(): void {
    if (this.concert.id === 0) {
      // Crear nuevo concierto
      this.concertService.createConcert(this.concert).subscribe(
        (newConcert) => {
          console.log('Concierto creado:', newConcert);
        },
        (error) => {
          console.error('Error creando concierto:', error);
        }
      );
    } else {
      // Actualizar concierto existente
      this.concertService.updateConcert(this.concert).subscribe(
        (updatedConcert) => {
          console.log('Concierto actualizado:', updatedConcert);
        },
        (error) => {
          console.error('Error actualizando concierto:', error);
        }
      );
    }
  }

  closeForm(): void {
    this.selectedConcert = null; 
  }
}
