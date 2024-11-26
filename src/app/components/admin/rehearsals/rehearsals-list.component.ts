import { Component, OnInit } from '@angular/core';
import { Rehearsal } from 'src/app/models/rehearsal.model';
import { RehearsalService } from 'src/app/services/rehearsals/rehearsal.service';

@Component({
  selector: 'app-rehearsals-list',
  templateUrl: './rehearsals-list.component.html',
  styleUrls: ['../admin.component.scss'],
})
export class RehearsalsListComponent implements OnInit {
  rehearsals: Rehearsal[] = [];
  selectedRehearsal: Rehearsal | null = null;
  isFormVisible: boolean = false;

  constructor(private rehearsalService: RehearsalService) {}

  ngOnInit(): void {
    this.loadRehearsals();
  }

  loadRehearsals(): void {
    this.rehearsalService.getRehearsals().subscribe(
      (data: Rehearsal[]) => {
        this.rehearsals = data;
      },
      (error) => {
        console.error('Error al cargar ensayos:', error);
      }
    );
  }

  editarRehearsal(rehearsal: Rehearsal): void {
    this.selectedRehearsal = { ...rehearsal };
    this.isFormVisible = true;
  }

  abrirFormulario(): void {
    this.selectedRehearsal = null;
    this.isFormVisible = true;
  }

  cerrarFormulario(): void {
    this.isFormVisible = false;
    this.loadRehearsals(); // Refresca la lista al cerrar el formulario
  }
}
