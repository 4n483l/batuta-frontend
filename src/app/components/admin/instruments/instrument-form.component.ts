import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InstrumentService } from 'src/app/services/instruments/instrument.service';
import { Instrument } from 'src/app/models/instrument.model';
import { tr } from 'date-fns/locale';
import { LoadingService } from 'src/app/services/loading/loading.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-instrument-form',
  templateUrl: './instrument-form.component.html',
  styleUrls: ['./instrument-admin.component.scss'],
})
export class InstrumentFormComponent implements OnInit {
  @Input() selectedInstrument: Instrument | null = null;

  instrument: Instrument = {
    id: 0,
    name: '',
    level: '',
  };
  isEditMode: boolean = false;
  isLoading: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private instrumentService: InstrumentService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    if (this.selectedInstrument) {
      this.instrument = { ...this.selectedInstrument };
      this.isEditMode = true;
      this.isLoading = false;
    } else {
      this.isLoading = false;
    }

    this.route.params.subscribe((params) => {
      const instrumentId = params['id'];
      if (instrumentId) {
        this.isLoading = true;
        this.instrumentService.getInstrumentById(instrumentId).subscribe(
          (data: Instrument) => {
            this.instrument = data;
            this.isEditMode = true;
            this.isLoading = false;
          },
          (error) => {
            this.isLoading = false;
          }
        );
      } else {
        this.isLoading = false;
      }
    });
  }

  saveInstrument(): void {
    if (this.instrument.id === 0) {
      this.instrumentService.createInstrument(this.instrument).subscribe(
        (newInstrument) => {
          Swal.fire({
            title: 'Instrumento creado con éxito',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          });
          this.isLoading = false;
          this.router.navigate(['/admin/instrument-admin']);
        },
        (error) => {
          Swal.fire({
            title: 'Error al crear instrumento',
            text: 'Hubo un problema al crear el instrumento.',
            icon: 'error',
          });
          this.isLoading = false;
        }
      );
    } else {
      this.instrumentService.updateInstrument(this.instrument).subscribe(
        (): void => {
          Swal.fire({
            title: 'Instrumento actualizado con éxito',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          });
          this.isLoading = false;
          this.router.navigate(['/admin/instrument-admin']);
        },
        (error) => {
          Swal.fire({
            title: 'Error al actualizar instrumento',
            text: 'Hubo un problema al actualizar el instrumento.',
            icon: 'error',
          });
          this.isLoading = false;
        }
      );
    }
  }

  closeForm(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Si cierras el formulario, se perderán los cambios no guardados.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4b6584',
      cancelButtonColor: '#c85a42',
      confirmButtonText: 'Sí, cerrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/admin/instrument-admin']);
      }
    });
  }
}
