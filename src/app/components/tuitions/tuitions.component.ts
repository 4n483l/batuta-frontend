import { Component } from '@angular/core';
import { Tuition } from '../../models/tuition.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-tuitions',
  templateUrl: './tuitions.component.html',
  styleUrls: ['./tuitions.component.scss'],
})
export class TuitionsComponent {
  instruments: string[] = [
    'Clarinete',
    'Flauta',
    'Oboe',
    'Saxo',
    'Trompa',
    'Trompeta',
    'Trombón',
    'Fagot',
    'Percusión',
    'Tuba',
    'Bombardino',
    'Piano',
    'Guitarra',
    'Violín',
    'Violoncello',
  ];

  name: string = '';
  lastName: string = '';
  dni: string = '';
  phone: string = '';
  address: string = '';
  city: string = '';
  postalCode: string = '';
  birthDate: string = '';
  email: string = '';
  subjects = {
    musicalLanguage: false,
    musicalGarden: false,
    choir: false,
    instrument: '',
  };
  // Inicialización de subjects en el constructor
  constructor(private router: Router) {}
  // Método onSubmit para manejar el formulario
  onSubmit(form: NgForm) {
    if (form.valid) {
      const {
        name,
        lastName,
        dni,
        phone,
        address,
        city,
        postalCode,
        birthDate,
        email,
        subjects,
      } = form.value;

      // Simulación de los datos enviados al backend
      const tuitionData = {
        name,
        lastName,
        dni,
        phone,
        address,
        city,
        postalCode,
        birthDate,
        email,
        subjects,
      };

      // Aquí simplemente mostramos los datos en la consola (simulando el proceso de registro)
      console.log('Datos de matrícula:', tuitionData);

      // Simulación de respuesta exitosa
      alert('Matrícula registrada exitosamente');

      // Redirigir a una página de éxito o donde lo necesites
      this.router.navigate(['/success']);
    } else {
      alert('Por favor, completa correctamente el formulario.');
    }
  }

/*   tuitionExample: Tuition = {
    name: 'Juan',
    lastName: 'Pérez',
    dni: '12345666g',
    phone: '123456789',
    address: 'Calle Falsa 123',
    city: 'memainvento',
    postalCode: '55555',
    birthDate: '2005-05-21',
    email: 'juan.perez@example.com',
    subjects: {
      musicalLanguage: true,
      musicalGarden: false,
      choir: true,
      instrument: 'Piano',
    },
  }; */
}
