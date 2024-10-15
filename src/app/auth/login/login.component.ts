import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'; // Importar NgForm para formularios basados en plantillas
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  // Método para manejar el envío del formulario
  onSubmit(form: NgForm) {
    if (form.valid) {
      // Verificar que el formulario sea válido
      const { email, password } = form.value;

      this.authService.login(email, password).subscribe(
        (response) => {
          alert('Inicio de sesión exitoso');
          this.router.navigate(['/dashboard']); // Redirige a otra página después del login exitoso
        },
        (error) => {
          alert('Error en el inicio de sesión');
          console.error(error);
        }
      );
    } else {
      alert('Por favor, completa el formulario correctamente');
    }
  }
}
