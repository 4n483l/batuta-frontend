import { Component, OnInit } from '@angular/core';
import { Rehearsal } from 'src/app/models/rehearsal.model';
import { RehearsalService } from 'src/app/services/rehearsals/rehearsal.service';

@Component({
  selector: 'app-rehearsal-admin',
  templateUrl: './rehearsal-admin.component.html',
  styleUrls: ['./rehearsal-admin.component.scss'],
})
export class RehearsalAdminComponent implements OnInit {
  currentList: Rehearsal[] = [];
  isLoading: boolean = true;

  constructor(
    private rehearsalService: RehearsalService,

  ) {}

  ngOnInit(): void {
    this.loadRehearsals();
  }

  loadRehearsals(): void {
    this.rehearsalService.getRehearsals().subscribe((data: any) => {
      this.currentList = Array.isArray(data.Rehearsals) ? data.Rehearsals : [];
      this.isLoading = false;
    });
  }

  deleteRehearsal(id: number): void {
    const confirmMessage = `¿Estás seguro de que deseas eliminar el instrumento `;

    if (confirm(confirmMessage)) {
      this.rehearsalService.deleteRehearsal(id).subscribe(() => {
        this.loadRehearsals();
      });
    }
  }
}
