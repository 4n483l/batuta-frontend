import { Component, OnInit } from '@angular/core';
import { Instrument } from 'src/app/models/instrument.model';
import { InstrumentService } from 'src/app/services/instruments/instrument.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instrument-admin',
  templateUrl: './instrument-admin.component.html',
  styleUrls: ['./instrument-admin.component.scss'],
})
export class InstrumentAdminComponent implements OnInit {
  instrumentsList: Instrument[] = [];

  isLoading: boolean = false;

  constructor(private instrumentService: InstrumentService) {}

  ngOnInit(): void {
    this.loadInstruments();
  }

  loadInstruments(): void {
    this.isLoading = true;
    this.instrumentService.getInstruments().subscribe(
      (data: any) => {
        this.instrumentsList = Array.isArray(data.instruments)
          ? data.instruments
          : [];

        this.isLoading = false;
      },
      (error) => {
        Swal.fire({
          title: 'Error al cargar instrumentos',
          text: 'Hubo un problema al cargar los instrumentos. Intenta nuevamente.',
          icon: 'error',
        });
        this.isLoading = false;
      }
    );
  }

  deleteInstrument(id: number, name: string): void {
    Swal.fire({
      title: `¿Estás seguro de que deseas eliminar el instrumento "${name}"?`,
      text: '¡Esta acción no se puede deshacer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4b6584',
      cancelButtonColor: '#c85a42',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.instrumentService.deleteInstrument(id).subscribe(
          () => {
            Swal.fire({
              title: '¡Instrumento eliminado!',
              text: `"${name}" ha sido eliminado correctamente.`,
              icon: 'success',
            });
            this.loadInstruments();
          },
          (error) => {
            Swal.fire({
              title: 'Error al eliminar instrumento',
              text: 'Hubo un problema al intentar eliminar el instrumento. Intenta nuevamente.',
              icon: 'error',
            });
          }
        );
      }
    });
  }
}
