import { Component, OnInit } from '@angular/core';
import { Instrument } from 'src/app/models/instrument.model';
import { InstrumentService } from 'src/app/services/instruments/instrument.service';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'app-instrument-admin',
  templateUrl: './instrument-admin.component.html',
  styleUrls: ['./instrument-admin.component.scss'],
})
export class InstrumentAdminComponent implements OnInit {
  instrumentsList: Instrument[] = [];

 // isLoading: boolean = true;

  constructor(
    private instrumentService: InstrumentService,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.loadInstruments();
  }

  get isLoading$() {
    return this.loadingService.isLoading$;
  }

  loadInstruments(): void {
    this.loadingService.setLoading(true);

    this.instrumentService.getInstruments().subscribe((data: any) => {
      if (Array.isArray(data.instruments)) {
        this.instrumentsList = data.instruments;
      } else {
        console.error('La respuesta no es un array', data.instruments);
      }
      this.loadingService.setLoading(false);
    });
  }

  deleteInstrument(id: number, name: string): void {
    const confirmMessage = `¿Estás seguro de que deseas eliminar el instrumento "${name}"?`;

    if (confirm(confirmMessage)) {
      this.instrumentService.deleteInstrument(id).subscribe(() => {
        this.loadInstruments();
      });
    }
  }
}
