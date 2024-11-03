import { Component } from '@angular/core';
import { Tuition } from '../../models/tuition.model';

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

  tuitionExample: Tuition = {
    firstName: 'Juan',
    lastName: 'Pérez',
    birthDate: '2005-05-21',
    address: 'Calle Falsa 123',
    email: 'juan.perez@example.com',
    phone: '123456789',
    subjects: {
      musicalLanguage: true,
      musicalGarden: false,
      choir: true,
      instrument: 'Piano',
    },
  };
}
