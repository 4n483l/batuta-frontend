import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RehearsalService } from 'src/app/services/rehearsals/rehearsal.service';
import { Rehearsal } from 'src/app/models/rehearsal.model';

@Component({
  selector: 'app-rehearsals-form',
  templateUrl: './rehearsals-form.component.html',
  styleUrls: ['../admin.component.scss'],
})
export class RehearsalsFormComponent implements OnInit {
  @Input() selectedRehearsal: Rehearsal | null = null;
  @Output() cerrarFormulario = new EventEmitter<void>();

  rehearsal: Rehearsal = {
    id: 0,
    place: '',
    date: '',
    hour: '',
  };

  constructor(private rehearsalService: RehearsalService) {}

  ngOnInit(): void {
    if (this.selectedRehearsal) {
      this.rehearsal = { ...this.selectedRehearsal };
    }
  }

  saveRehearsal(): void {
    if (this.rehearsal.id === 0) {
      // Crear nuevo ensayo
      this.rehearsalService.createRehearsal(this.rehearsal).subscribe(
        () => {
          this.cerrarFormulario.emit();
        },
        (error) => {
          console.error('Error al crear ensayo:', error);
        }
      );
    } else {
      // Actualizar ensayo existente
      this.rehearsalService.updateRehearsal(this.rehearsal).subscribe(
        () => {
          this.cerrarFormulario.emit();
        },
        (error) => {
          console.error('Error al actualizar ensayo:', error);
        }
      );
    }
  }

  closeForm(): void {
    this.cerrarFormulario.emit();
  }
}
