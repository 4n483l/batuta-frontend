import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  // Nuevas propiedades para los campos adicionales
  name: string = '';
  surname: string = '';
  dni: string = '';
  phone: string = '';
  address: string = '';
  city: string = '';
  postalCode: string = '';
  birthdate: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const {
        name,
        surname,
        dni,
        phone,
        address,
        city,
        postalCode,
        birthdate,
        email,
        password,
        confirmPassword,
      } = form.value;

      // Llamada al servicio de registro con todos los datos
      this.authService
        .register({
          name,
          surname,
          dni,
          phone,
          address,
          city,
          postalCode,
          birthdate,
          email,
          password,
          confirmPassword,
        })
        .subscribe(
          (response) => {
            alert('Registro exitoso');
            console.log('Respuesta del backend:', response);
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
