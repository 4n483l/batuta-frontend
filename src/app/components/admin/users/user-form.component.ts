import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

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
      console.log('Edit mode activado', this.isEditMode);
      this.loadUser(userId);
    }
  }

  loadUser(userId: string): void {
    this.isLoading = true;
    this.authService.getAuthenticatedData(`users/${userId}`).subscribe(
      (response: any) => {
        console.log('Usuario cargado:', response.User);
        this.user = response.User;
        this.isLoading = false;
        console.log('respuesta completa:', response);
      },
      (error) => {
        console.error('Error al cargar usuario:', error);
        this.isLoading = false;
      }
    );
  }

  saveUser(): void {
    // Crear un objeto con los datos del usuario a guardar, sin incluir el correo electrónico si estamos en modo de edición
    const userToSave = { ...this.user };

    // Si estamos en modo de edición, no enviamos el campo email
    if (this.isEditMode) {
      delete userToSave.email; // Eliminar el campo email antes de enviarlo al backend
    }

    if (this.isEditMode) {
      this.authService.updateUser(this.user.id, userToSave).subscribe(
        (response) => {
          alert('Usuario actualizado');
          this.router.navigate(['/admin/user-admin']);
        },
        (error) => {
          console.error('Error al actualizar usuario:', error);
        }
      );
    } else {
      this.authService.createUser(this.user).subscribe(
        (response) => {
          alert('Usuario creado');
          this.router.navigate(['/admin/user-admin']);
        },
        (error) => {
          console.error('Error al crear usuario:', error);
        }
      );
    }
  }

  closeForm(): void {
    this.router.navigate(['/admin/user-admin']);
  }
}
