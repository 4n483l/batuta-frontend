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
    this.authService.getStudents().subscribe(
      (response: any) => {
        const students = response.Students;

        if (Array.isArray(students)) {
          // Filtrar los estudiantes que pertenecen al usuario
          const studentsForUser = students.filter(
            (student) => student.user_id === userId
          );

          let confirmationMessage = `¿Estás seguro que quieres borrar a ${userName} ${userLastname}?`;
          if (studentsForUser.length > 0) {
            confirmationMessage +=
              '\n¡Este usuario tiene estudiantes a su cargo! Si lo borras, los estudiantes también serán eliminados.';
          } else {
            confirmationMessage += '\n¡Los cambios no se pueden modificar!';
          }

          Swal.fire({
            title: confirmationMessage,
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
      },
      (error) => {
        console.error('Error al obtener estudiantes:', error);
        Swal.fire({
          title: 'Error al verificar estudiantes',
          icon: 'error',
        });
      }
    );
  }

  getUserTypeLabel(userType: string): string {
    const userTypeMap: { [key: string]: string } = {
      member: 'Socio',
      student: 'Estudiante',
      teacher: 'Profesor',
      musician: 'Músico',
      admin: 'Administrador',
    };

    return userTypeMap[userType] || 'Desconocido';
  }
}
