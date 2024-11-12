import { Component, OnInit } from '@angular/core';
import { Tuition } from '../../models/tuition.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TuitionService } from 'src/app/services/tuitions/tuition.service';

@Component({
  selector: 'app-tuitions',
  templateUrl: './tuitions.component.html',
  styleUrls: ['./tuitions.component.scss'],
})
export class TuitionsComponent implements OnInit {
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

  isLoading: boolean = true; // Nueva propiedad para controlar el estado de carga

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

  constructor(private router: Router, private tuitionService: TuitionService) {}

  // el get de back para cuando inicialice la pantalla
  ngOnInit(): void {
    this.tuitionService.getTuitions().subscribe((data: any) => {
      // la variable usuario es la que está en controlle dentro de json
      this.phone = data.usuario.phone;
      this.address = data.usuario.address;
      this.city = data.usuario.city;
      this.postalCode = data.usuario.postl_code;
      this.email = data.usuario.email;

      console.log('Componente tuitions:', data.usuario);
      this.isLoading = false;
    });
  }

  // Método onSubmit para manejar el formulario en post
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

      this.tuitionService.postTuition(tuitionData).subscribe((data: any) => {
        console.log('Matrícula realizada:', data);
        this.router.navigate(['/dashboard']);
        alert('Matrícula realizada con éxito.');
      });
    } else {
      alert('Por favor, completa correctamente el formulario.');
    }
  }
}
