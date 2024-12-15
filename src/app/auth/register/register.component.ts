import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  // Nuevas propiedades para los campos adicionales
  name: string = '';
  lastname: string = '';
  dni: string = '';
  phone: string = '';
  address: string = '';
  city: string = '';
  postalCode: string = '';
  birthdate: string = '';
  email: string = '';
  password: string = '';
  password_confirmation: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      const {
        name,
        lastname,
        dni,
        phone,
        address,
        city,
        postalCode,
        birthdate,
        email,
        password,
        password_confirmation,
      } = form.value;

      this.authService
        .register({
          name,
          lastname,
          dni,
          phone,
          address,
          city,
          postalCode,
          birthdate,
          email,
          password,
          password_confirmation,
        })
        .subscribe(
          (response) => {
            Swal.fire({
              title: 'Registro exitoso',
              text: 'Usuario registrado correctamente.',
              icon: 'success',
              timer: 1500,
              confirmButtonColor: '#4b6584',
              showConfirmButton: false,
            }).then(() => {
              this.router.navigate(['/login']);
            });
          },
          (error) => {
            console.error('Error durante el registro:', error);
            Swal.fire({
              title: 'Formulario incompleto',
              text: 'Por favor, completa correctamente el formulario.',
              icon: 'error',
              confirmButtonColor: '#c85a42',
            });
          }
        );
    }
  }
}
