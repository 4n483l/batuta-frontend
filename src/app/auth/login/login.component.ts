import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'; // Importar NgForm para formularios basados en plantillas
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) {}

  // Método para manejar el envío del formulario
  onSubmit(form: NgForm) {
    if (form.valid) {
      // Verificar que el formulario sea válido
      const { email, password } = form.value;

      // Validar credenciales (simulación)
      if (email === 'usuario@ejemplo.com' && password === '123456') {
        alert('Inicio de sesión exitoso');
        this.router.navigate(['/dashboard']); // Redirigir si el login es correcto
      } else {
        alert('Correo o contraseña incorrectos');
      }
    } else {
      alert('Por favor, completa el formulario correctamente');
    }
  }
}
