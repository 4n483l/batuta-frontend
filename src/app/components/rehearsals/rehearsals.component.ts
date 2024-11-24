import { Component, OnInit } from '@angular/core';
import { Rehearsal } from 'src/app/models/rehearsal.model';
import { RehearsalService } from 'src/app/services/rehearsals/rehearsal.service';

@Component({
  selector: 'app-rehearsals',
  templateUrl: './rehearsals.component.html',
  styleUrls: ['./rehearsals.component.scss'],
})
export class RehearsalsComponent implements OnInit {
  rehearsals: Rehearsal[] = [];

  constructor(private rehearsalService: RehearsalService) {}

  ngOnInit(): void {
    this.rehearsalService.getRehearsals().subscribe((data: any) => {
      this.rehearsals = Array.isArray(data.Rehearsals) ? data.Rehearsals : [];
      console.log('Componente rehearsals:', this.rehearsals);
    });
  }
}
