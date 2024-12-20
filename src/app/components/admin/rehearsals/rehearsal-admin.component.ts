import { Component, OnInit } from '@angular/core';
import { Rehearsal } from 'src/app/models/rehearsal.model';
import { RehearsalService } from 'src/app/services/rehearsals/rehearsal.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rehearsal-admin',
  templateUrl: './rehearsal-admin.component.html',
  styleUrls: ['./rehearsal-admin.component.scss'],
  providers: [DatePipe],
})
export class RehearsalAdminComponent implements OnInit {
  currentList: Rehearsal[] = [];
  isLoading: boolean = true;

  constructor(private rehearsalService: RehearsalService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadRehearsals();
  }

  loadRehearsals(): void {
    this.rehearsalService.getRehearsals().subscribe(
      (data: any) => {
        this.currentList =
          data.Rehearsals.map((rehearsal: any) => {
            rehearsal.date = this.datePipe.transform(rehearsal.date, 'dd-MM-yyyy');
            return rehearsal;
          }) || [];
        this.isLoading = false;
      },
      (error) => {
      console.error('Error al cargar los ensayos:', error);
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
