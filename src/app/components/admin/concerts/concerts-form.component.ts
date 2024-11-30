import { Component, Input, OnInit } from '@angular/core';
import { ConcertService } from 'src/app/services/concerts/concert.service';
import { Concert } from 'src/app/models/concert.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-concerts-form',
  templateUrl: './concerts-form.component.html',
  styleUrls: ['./concert-admin.component.scss'],
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

  isEditMode: boolean = false;
  isLoading: boolean = true;

  constructor(
    private concertService: ConcertService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.selectedConcert) {
      this.concert = { ...this.selectedConcert };
      this.isEditMode = true;
      this.isLoading = false;
    }else{
      this.isLoading = false;
    }

    this.route.params.subscribe((params) => {
      const concertId = params['id'];
      if (concertId) {
        this.concertService
          .getConcertById(concertId)
          .subscribe((data: Concert) => {
            this.concert = data;
            this.isEditMode = true;
            this.isLoading = false;
          });
      } else {
        this.isLoading = false;
      }
    });
  }

  saveConcert(): void {
    if (this.concert.id === 0) {
      // Crear nuevo concierto
      this.concertService.createConcert(this.concert).subscribe(
        (newConcert) => {
          console.log('Concierto creado:', newConcert);
          this.router.navigate(['/admin/concert-admin']);
          this.isLoading = false;
        },
        (error) => {
          console.error('Error creando concierto:', error);
          this.isLoading = false;
        }
      );
    } else {
      // Actualizar concierto existente
      this.concertService.updateConcert(this.concert).subscribe(
        (updatedConcert) => {
          console.log('Concierto actualizado:', updatedConcert);
          this.router.navigate(['/admin/concert-admin']);
          this.isLoading = false;
        },
        (error) => {
          console.error('Error actualizando concierto:', error);
          this.isLoading = false;
        }
      );
    }
  }

  closeForm(): void {
    this.router.navigate(['/admin/concert-admin']);
  }
}
