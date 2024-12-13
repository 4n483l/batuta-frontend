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
  isLoading: boolean = true;

  constructor(private rehearsalService: RehearsalService) {}

  ngOnInit(): void {
    this.rehearsalService.getRehearsals().subscribe((data: any) => {
      this.rehearsals = Array.isArray(data.Rehearsals) ? data.Rehearsals : [];
      
      this.isLoading = false;
    },
    (error) => {
      console.error('Error al cargar ensayos', error);
      this.isLoading = false;
    }
  );
  }
}
