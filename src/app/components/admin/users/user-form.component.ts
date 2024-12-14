import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-admin.component.scss'],
})
export class UserFormComponent implements OnInit {
  user: any = {};
  isEditMode: boolean = false;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.isEditMode = true;
      this.loadUser(userId);
    }
  }

  loadUser(userId: string): void {
    this.isLoading = true;
    this.authService.getAuthenticatedData(`users/${userId}`).subscribe(
      (response: any) => {
        this.user = response.User;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar el usuario:', error);
        this.isLoading = false;
      /*   Swal.fire({
          title: 'Error al cargar el usuario',
          text: 'Hubo un problema al obtener los datos del usuario.',
          icon: 'error',
        }); */
      }
    );
  }

  saveUser(): void {
    this.authService.updateUser(this.user.id, this.user).subscribe(
      (response) => {
        //Swal.close();

        Swal.fire({
          title: 'Usuario actualizado con éxito',
          icon: 'success',
          timer: 1500,
          showConfirmButton: false,
        });
        this.router.navigate(['/admin/user-admin']);
      },
      (error) => {
        console.error('Error al actualizar usuario:', error);
      /*   Swal.fire({
          title: 'Error al actualizar usuario',
          text: 'No se pudieron guardar los cambios.',
          icon: 'error',
        }); */
      }
    );
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
        this.router.navigate(['/admin/user-admin']);
      }
    });
  }
}


