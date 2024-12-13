import { Component, OnInit } from '@angular/core';
import { Concert } from 'src/app/models/concert.model';
import { ConcertService } from 'src/app/services/concerts/concert.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-concert-admin',
  templateUrl: './concert-admin.component.html',
  styleUrls: ['./concert-admin.component.scss'],
})
export class ConcertAdminComponent implements OnInit {
  currentList: Concert[] = [];
  isLoading: boolean = true;

  constructor(private concertService: ConcertService) {}

  ngOnInit(): void {
    this.loadConcerts();
  }

  loadConcerts(): void {
    this.concertService.getConcerts().subscribe(
      (data: any) => {
        this.currentList = Array.isArray(data.Concerts) ? data.Concerts : [];
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        console.error('Error al cargar conciertos:', error);
        Swal.fire({
          title: 'Error al cargar conciertos',
          text: 'Hubo un problema al cargar los conciertos. Intenta nuevamente.',
          icon: 'error',
        });
      }
    );
  }

  deleteConcert(id: number): void {
    Swal.fire({
      title: '¿Estás seguro de que quieres eliminar este concierto?',
      text: '¡Esta acción no se puede deshacer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4b6584',
      cancelButtonColor: '#c85a42',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.concertService.deleteConcert(id).subscribe({
          next: () => {
            this.currentList = this.currentList.filter(
              (concert) => concert.id !== id
            );
            Swal.fire({
              title: '¡Concierto eliminado!',
              text: 'El concierto ha sido eliminado correctamente.',
              icon: 'success',
            });
          },
          error: (error) => {
            console.error('Error eliminando el concierto:', error);
            Swal.fire({
              title: 'Error al eliminar concierto',
              text: 'Hubo un problema al eliminar el concierto. Intenta de nuevo más tarde.',
              icon: 'error',
            });
          },
        });
      }
    });
  }
}
