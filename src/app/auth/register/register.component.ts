import { Component } from '@angular/core';
import { NgForm } from '@angular/forms'; // Importar NgForm para manejar el formulario

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

  constructor() {}

  onSubmit(form: NgForm) {
    if (form.valid) {
      // Aquí puedes enviar los datos al backend o realizar cualquier acción de registro
      alert('Registro exitoso');
      console.log('Datos de registro:', form.value);
    } else {
      alert('Por favor, completa correctamente el formulario.');
    }
  }
}
