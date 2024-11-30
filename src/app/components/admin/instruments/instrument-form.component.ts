import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InstrumentService } from 'src/app/services/instruments/instrument.service';
import { Instrument } from 'src/app/models/instrument.model';
import { tr } from 'date-fns/locale';
import { LoadingService } from 'src/app/services/loading/loading.service';

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
            console.log('Instrumento asignado:', this.instrument); // Confirma que los datos se asignaron correctamente
          }, (error) => {
            console.error('Error obteniendo instrumento:', error);
            this.isLoading = false;
          });
      } else {
        this.isLoading = false;
      }
    });
  }

  saveInstrument(): void {
    if (this.instrument.id === 0) {
      // Crear nuevo instrumento
      this.instrumentService.createInstrument(this.instrument).subscribe(
        (newInstrument) => {
          console.log('Instrumento creado:', newInstrument);
          this.router.navigate(['/admin/instrument-admin']);
          this.isLoading = false;
        },
        (error) => {
          console.error('Error creando instrumento:', error);
          this.isLoading = false;
        }
      );
    } else {
      // Actualizar instrumento existente
      this.instrumentService.updateInstrument(this.instrument).subscribe(
        () => {
          console.log('Instrumento actualizado:');
          this.router.navigate(['/admin/instrument-admin']);
          this.isLoading = false;
        },
        (error) => {
          console.error('Error actualizando instrumento:', error);
          this.isLoading = false;
        }
      );
    }
  }

  closeForm(): void {
    this.router.navigate(['/admin/instrument-admin']);
  }
}
