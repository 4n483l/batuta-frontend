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

  constructor(
    private rehearsalService: RehearsalService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.selectedRehearsal) {
      this.rehearsal = { ...this.selectedRehearsal };
    }
    this.route.params.subscribe((params) => {
      const rehearsalId = params['id'];
      if (rehearsalId) {
        this.rehearsalService
          .getRehearsalById(rehearsalId)
          .subscribe((data: Rehearsal) => {
            this.rehearsal = data;
          });
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
        },
        (error) => {
          console.error('Error al crear ensayo:', error);
        }
      );
    } else {
      // Actualizar ensayo existente
      this.rehearsalService.updateRehearsal(this.rehearsal).subscribe(
        (updatedRehearsal) => {
                console.log('Ensayo actualizado:', updatedRehearsal);
                this.router.navigate(['/admin/rehearsal-admin']);
        },
        (error) => {
          console.error('Error al actualizar ensayo:', error);
        }
      );
    }
  }

  closeForm(): void {
    console.log('Redirigiendo a /admin/rehearsal-admin');
    this.router.navigate(['/admin/rehearsal-admin']);
  }
}
