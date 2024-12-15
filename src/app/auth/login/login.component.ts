import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'; // Importar NgForm para formularios basados en plantillas
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

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
      const { email, password } = form.value;

      this.authService.login(email, password).subscribe(
        (response) => {
          Swal.fire({
            title: 'Inicio de sesión exitoso',
            text: '¡Bienvenid@!',
            icon: 'success',
            timer: 1500,
            confirmButtonColor: '#4b6584',
            showConfirmButton: false,
          }).then(() => {
            this.router.navigate(['/dashboard']);
          });
        },
        (error) => {
          console.error(error);
          Swal.fire({
            title: 'Error en el inicio de sesión',
            text: 'Inténtalo de nuevo.',
            icon: 'error',
            confirmButtonColor: '#c85a42',
          });
        }
      );
    } else {
      Swal.fire({
        title: 'Formulario incompleto',
        text: 'Por favor, completa todos los campos correctamente.',
        icon: 'error',
        timer: 1500,
        confirmButtonColor: '#4b6584',
        showConfirmButton: false,
      });
    }
  }
}
