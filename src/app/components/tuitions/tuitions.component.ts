import { Component, OnInit } from '@angular/core';
import { Tuition } from '../../models/tuition.model';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TuitionService } from 'src/app/services/tuitions/tuition.service';
import { FormsModule } from '@angular/forms';

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
  instrument: string = '';

  isLoading: boolean = true;

  name: string = '';
  lastName: string = '';
  dni: string = '';
  phone: string = '';
  address: string = '';
  city: string = '';
  postal_code: string = '';
  birthDate: string = '';
  email: string = '';
  subjects: { id: number; nombre: string }[] = [
    { id: 1, nombre: 'Lenguaje musical' },
    { id: 2, nombre: 'Jardín musical' },
    { id: 3, nombre: 'Coro' },
    { id: 4, nombre: 'Instrumento' },
  ];

  subjectsSelected: { [key: number]: boolean } = {};

  constructor(private router: Router, private tuitionService: TuitionService) {}

  // el get de back para cuando inicialice la pantalla
  ngOnInit(): void {
    this.tuitionService.getTuitions().subscribe((data: any) => {
      // la variable usuario es la que está en controlle dentro de json
      this.phone = data.usuario.phone;
      this.address = data.usuario.address;
      this.city = data.usuario.city;
      this.postal_code = data.usuario.postal_code;
      this.email = data.usuario.email;

      console.log('Componente tuitions:', data.usuario);
      this.isLoading = false;
    });

    this.subjects.forEach((subject) => {
      if (subject.nombre !== 'Instrumento') {
        this.subjectsSelected[subject.id] = false; // Cada asignatura empieza no seleccionada
        console.log(
          'subject SElected dentro if:',
          this.subjectsSelected[subject.id]
        );
      }
      console.log('subject SElected fuera if:', subject);
    });

    console.log(this.subjectsSelected);
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
        postal_code,
        birthDate,
        email,
        subjects,
      } = form.value;

      // Simulación de los datos enviados al backend
      const tuitionData = {
        name,
        lastname: lastName,
        dni,
        phone,
        address,
        city,
        postal_code,
        birth_date: birthDate,
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

  onClickCheckbox(id : number) {
    console.log('id dentro de onClickCheckbox:', id);
    this.subjectsSelected[id] = !this.subjectsSelected[id];
    console.log('onClickCheckbox:', this.subjectsSelected);
  }
}
