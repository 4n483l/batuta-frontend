import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-user-admin',
  templateUrl: './user-admin.component.html',
  styleUrls: ['./user-admin.component.scss'],
})
export class UserAdminComponent implements OnInit {
  users: any[] = [];
  isLoading: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.authService.getAuthenticatedData('users').subscribe(
      (response: any) => {
        this.users = response.Users;
        this.isLoading = false;
        console.log('Usuarios cargados:', this.users);
      },
      (error) => {
        console.error('Error al cargar usuarios:', error);
        this.isLoading = false;
      }
    );
  }

  deleteUser(userId: number): void {
    this.authService.deleteUser(userId).subscribe(
      (response: any) => {
        alert('Usuario eliminado');
        this.loadUsers();
      },
      (error) => {
        console.error('Error al eliminar usuario:', error);
      }
    );
  }
}
