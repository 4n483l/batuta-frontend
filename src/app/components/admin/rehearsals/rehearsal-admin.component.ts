import { Component, OnInit } from '@angular/core';
import { Rehearsal } from 'src/app/models/rehearsal.model';
import { RehearsalService } from 'src/app/services/rehearsals/rehearsal.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rehearsal-admin',
  templateUrl: './rehearsal-admin.component.html',
  styleUrls: ['./rehearsal-admin.component.scss'],
})
export class RehearsalAdminComponent implements OnInit {
  currentList: Rehearsal[] = [];
  isLoading: boolean = true;

  constructor(private rehearsalService: RehearsalService) {}

  ngOnInit(): void {
    this.loadRehearsals();
  }

  loadRehearsals(): void {
    this.rehearsalService.getRehearsals().subscribe(
      (data: any) => {
        this.currentList = Array.isArray(data.Rehearsals)
          ? data.Rehearsals
          : [];
        this.isLoading = false;
      },
      (error) => {
        Swal.fire({
          title: 'Error al cargar ensayos',
          text: 'Hubo un problema al cargar los ensayos. Intenta nuevamente.',
          icon: 'error',
        });
        this.isLoading = false;
      }
    );
  }

  deleteRehearsal(id: number): void {
    Swal.fire({
      title: '¿Estás seguro de que deseas eliminar este ensayo?',
      text: '¡Esta acción no se puede deshacer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4b6584',
      cancelButtonColor: '#c85a42',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.rehearsalService.deleteRehearsal(id).subscribe(
          () => {
            Swal.fire({
              title: '¡Eliminado!',
              text: 'El ensayo ha sido eliminado correctamente.',
              icon: 'success',
            });
            this.loadRehearsals();
          },
          (error) => {
            Swal.fire({
              title: 'Error al eliminar ensayo',
              text: 'Hubo un problema al intentar eliminar el ensayo. Intenta nuevamente.',
              icon: 'error',
            });
          }
        );
      }
    });
  }
}
