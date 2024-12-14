import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss'],
})
export class UserAdminComponent implements OnInit {
  users: any[] = [];
  isLoading: boolean = true;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.getAuthenticatedData('users').subscribe(
      (response: any) => {
        this.users = response.Users;
        this.isLoading = false;
       
      },
      (error) => {
        console.error('Error al cargar usuarios:', error);
        this.isLoading = false;
      }
    );
  }

  deleteUser(userId: number, userName: string, userLastname: string): void {
    Swal.fire({
      title: `¿Estás seguro que quieres borrar a ${userName}?`,
      text: '¡Los cambios no se pueden modificar!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4b6584',
      cancelButtonColor: '#c85a42',
      confirmButtonText: 'Sí, borrar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteUser(userId).subscribe(
          (response: any) => {
            Swal.fire({
              title: '¡Borrado!',
              text: `El usuario ${userName} ${userLastname} ha sido borrado.`,
              icon: 'success',
            });
            this.loadUsers();
          },
          (error) => {
            Swal.fire({
              title: 'Error al eliminar usuario',
              icon: 'error',
            });
          }
        );
      }
    });
  }
}
