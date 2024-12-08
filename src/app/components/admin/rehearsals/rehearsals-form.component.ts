import { Component, Input, OnInit } from '@angular/core';
import { RehearsalService } from 'src/app/services/rehearsals/rehearsal.service';
import { Rehearsal } from 'src/app/models/rehearsal.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-rehearsals-form',
  templateUrl: './rehearsals-form.component.html',
  styleUrls: ['./rehearsal-admin.component.scss'],
})
export class RehearsalsFormComponent implements OnInit {
  @Input() selectedRehearsal: Rehearsal | null = null;

  rehearsal: Rehearsal = {
    id: 0,
    place: '',
    date: '',
    hour: '',
  };
  isEditMode: boolean = false;
  isLoading: boolean = true;

  constructor(
    private rehearsalService: RehearsalService,
    private route: ActivatedRoute,
    private router: Router,
  ) {}

  ngOnInit(): void {
    if (this.selectedRehearsal) {
      this.rehearsal = { ...this.selectedRehearsal };
      this.isEditMode = true;
      this.isLoading = false;
    } else {
      this.isLoading = false;
    }

    this.route.params.subscribe((params) => {
      const rehearsalId = params['id'];
      if (rehearsalId) {
      this.isLoading = true;
        this.rehearsalService
          .getRehearsalById(rehearsalId)
          .subscribe((data: Rehearsal) => {
            this.rehearsal = data;
            this.isEditMode = true;
            this.isLoading = false;
          });
      } else {
        this.isLoading = false;
      }
    });
  }

  saveRehearsal(): void {
    if (
      this.rehearsal.place !== 'auditorium' &&
      this.rehearsal.place !== 'rehearsal room'
    ) {
      console.error('El lugar no es válido');
      return;
    }

    if (this.rehearsal.id === 0) {
      // Crear nuevo ensayo
      this.rehearsalService.createRehearsal(this.rehearsal).subscribe(
        (newRehearsal) => {
          console.log('Ensayo creado:', newRehearsal);
          this.router.navigate(['/admin/rehearsal-admin']);
          this.isLoading = false;
        },
        (error) => {
          console.error('Error al crear ensayo:', error);
          this.isLoading = false;
        }
      );
    } else {
      // Actualizar ensayo existente
      this.rehearsalService.updateRehearsal(this.rehearsal).subscribe(
        (updatedRehearsal) => {
          console.log('Ensayo actualizado:', updatedRehearsal);
          this.router.navigate(['/admin/rehearsal-admin']);
          this.isLoading = false;
        },
        (error) => {
          console.error('Error al actualizar ensayo:', error);
          this.isLoading = false;
        }
      );
    }
  }

  closeForm(): void {
    console.log('Redirigiendo a /admin/rehearsal-admin');
    this.router.navigate(['/admin/rehearsal-admin']);
  }
}
