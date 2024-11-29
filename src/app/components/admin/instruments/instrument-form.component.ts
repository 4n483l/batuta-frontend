import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InstrumentService } from 'src/app/services/instruments/instrument.service';
import { Instrument } from 'src/app/models/instrument.model';

@Component({
  selector: 'app-instrument-form',
  templateUrl: './instrument-form.component.html',
  //styleUrls: ['./instrument-form.component.scss'],
})
export class InstrumentFormComponent implements OnInit {
  instrument: Instrument = { id: 0, name: '', level: '' };
  isEditMode: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private instrumentService: InstrumentService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.instrumentService.getInstrumentById(+id).subscribe((data) => {
        this.instrument = data;
      });
    }
  }

  saveInstrument(): void {
    if (this.isEditMode) {
      this.instrumentService.updateInstrument(this.instrument).subscribe(() => {
        this.router.navigate(['/admin/instrument-admin']);
      });
    } else {
      this.instrumentService.createInstrument(this.instrument).subscribe(() => {
        this.router.navigate(['/admin/instrument-admin']);
      });
    }
  }

  cancel(): void {
    this.router.navigate(['/admin/instrument-admin']);
  }
}
