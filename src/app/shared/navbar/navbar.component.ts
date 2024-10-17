import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isLoggedIn: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    // Puedes verificar el estado de autenticación de varias maneras:
    // Aquí se asume que el AuthService tiene un método para verificar si el usuario está logueado
    // this.isLoggedIn = this.authService.isAuthenticated();
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;
    });
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
  }
}
