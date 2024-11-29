import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Instrument } from 'src/app/models/instrument.model';
import { InstrumentService } from 'src/app/services/instruments/instrument.service';

@Component({
  selector: 'app-instrument-admin',
  templateUrl: './instrument-admin.component.html',
  styleUrls: ['./instrument-admin.component.scss'],
})
export class InstrumentAdminComponent implements OnInit {
  instruments: any[] = [];

  constructor(
    private instrumentService: InstrumentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadInstruments();
  }

  loadInstruments(): void {
    this.instrumentService.getInstruments().subscribe((data: any) => {
       if (Array.isArray(data.instruments)) {
         this.instruments = data.instruments;
       } else {
         console.error('La respuesta no es un array', data.instruments);
       }
    });
  }

  addInstrument(): void {
    this.router.navigate(['/admin/instruments-form']);
  }

  editInstrument(id: number): void {
    this.router.navigate([`/admin/instruments-form/${id}`]);
  }


  deleteInstrument(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este instrumento?')) {
      this.instrumentService.deleteInstrument(id).subscribe(() => {
        this.loadInstruments(); // Recargar la lista después de eliminar
      });
    }
  }
}
