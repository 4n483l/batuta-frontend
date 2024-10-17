import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'; // Importar NgForm para manejar el formulario
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  name: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const { name, email, password, confirmPassword } = form.value;
      // Llamada al servicio de registro
      this.authService
        .register(name, email, password, confirmPassword)
        .subscribe(
          (response) => {
            alert('Registro exitoso');
            console.log('Respuesta del backend:', response);
            // Redirige al usuario después del registro exitoso, si es necesario
            this.router.navigate(['/login']);
          },
          (error) => {
            console.error('Error durante el registro:', error);
            alert('Hubo un error en el registro. Inténtalo de nuevo.');
          }
        );
    } else {
      alert('Por favor, completa correctamente el formulario.');
    }
  }
}
