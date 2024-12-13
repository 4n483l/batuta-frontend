import { Component, Input, OnInit } from '@angular/core';
import { RehearsalService } from 'src/app/services/rehearsals/rehearsal.service';
import { Rehearsal } from 'src/app/models/rehearsal.model';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

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
    private router: Router
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
      this.rehearsal.place !== 'Auditorio' &&
      this.rehearsal.place !== 'Sala de ensayo'
    ) {
      Swal.fire({
        title: 'Error',
        text: 'El lugar no es válido. Debe ser "Auditorio" o "Sala de ensayo".',
        icon: 'error',
      });
      return;
    }

    if (this.rehearsal.id === 0) {
      // Crear nuevo ensayo
      this.rehearsalService.createRehearsal(this.rehearsal).subscribe(
        (newRehearsal) => {
          Swal.fire({
            title: 'Ensayo creado con éxito',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          });
          this.isLoading = false;
          this.router.navigate(['/admin/rehearsal-admin']);
        },
        (error) => {
          Swal.fire({
            title: 'Error al crear ensayo',
            text: 'Hubo un problema al crear el ensayo.',
            icon: 'error',
          });
          this.isLoading = false;
        }
      );
    } else {
      // Actualizar ensayo existente
      this.rehearsalService.updateRehearsal(this.rehearsal).subscribe(
        (updatedRehearsal) => {
          Swal.fire({
            title: 'Ensayo actualizado con éxito',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          });
          this.isLoading = false;
          this.router.navigate(['/admin/rehearsal-admin']);
        },
        (error) => {
          Swal.fire({
            title: 'Error al actualizar ensayo',
            text: 'Hubo un problema al actualizar el ensayo.',
            icon: 'error',
          });
          this.isLoading = false;
        }
      );
    }
  }

  closeForm(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Si cierras el formulario, se perderán los cambios no guardados.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4b6584',
      cancelButtonColor: '#c85a42',
      confirmButtonText: 'Sí, cerrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/admin/rehearsal-admin']);
      }
    });
  }
}
