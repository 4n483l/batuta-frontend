import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TuitionService } from 'src/app/services/tuitions/tuition.service';
import { Instrument, Tuition, Subject } from 'src/app/models/tuition.model';
import { SubjectService } from 'src/app/services/subjects/subject.service';


@Component({
  selector: 'app-tuitions',
  templateUrl: './tuitions.component.html',
  styleUrls: ['./tuitions.component.scss'],
})
export class TuitionsComponent implements OnInit {
  // Inicializar datos
  name: string = '';
  lastName: string = '';
  dni: string = '';
  phone: string = '';
  address: string = '';
  city: string = '';
  postal_code: string = '';
  birth_date: string = '';
  email: string = '';

  subjects: Subject[] = [];
  checkedSubjects: { [key: number]: boolean } = {};
  instruments: Instrument[] = [];
  selectedInstrumentId: number | null = null;

  isLoading: boolean = true;

  // datos de prueba
  /*  subjects: { id: number; nombre: string }[] = [ ];
  checkedSubjects: { [key: number]: boolean } = {};
  instruments2: string[] = [
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
  instruments: Instrument[] = [
    { id: 1, name: 'Piano' },
    { id: 2, name: 'Guitarra' },
    { id: 3, name: 'Violín' },
  ];
  selectedInstrumentId: number | null = null;
 */

  constructor(private router: Router, private tuitionService: TuitionService, private subjectService: SubjectService) {}

  // el get de back para cuando inicialice la pantalla
  ngOnInit(): void {

    // this.checkedSubjects[4] = true;

    this.subjectService.getSubjects().subscribe((dataSubject: any) => {
      console.log('Datos de asignaturas: ', dataSubject);

      this.subjects = dataSubject;
    });

     this.subjectService.getInstruments().subscribe((dataInstrument: any) => {
       console.log('Datos de Instrumentos: ', dataInstrument);

           this.instruments = dataInstrument.instruments;

           console.log('Instrumento 1 ', this.instruments[0]);
           console.log('Instrumento 2 ', this.instruments[1]);
     });



    this.tuitionService.getTuitions().subscribe((data: any) => {
            console.log('Datos recibidos de la API:', data);
                 this.isLoading = false;
      // traemos los datos del usuario logueado
      this.phone = data.usuario.phone;
      this.address = data.usuario.address;
      this.city = data.usuario.city;
      this.postal_code = data.usuario.postal_code;
      this.email = data.usuario.email;


        // this.subjects.find((subject) => subject.name === 'Instrumento') ?.instruments || [];

      // inicializar los checkbox
      this.subjects.forEach((subject) => {
        if (subject.name !== 'Instrumento') {
          this.checkedSubjects[subject.id] = false;
        }
      });
      console.log('Componente tuitions:', data.usuario);


    });
    console.log('cambios estado:', this.checkedSubjects);
  }

  // Envío del formulario
  onSubmit(form: NgForm) {
    if (form.valid) {
      const selectedSubjects = Object.keys(this.checkedSubjects)
        .filter((key) => this.checkedSubjects[+key])
        .map((key) => +key); // Convierte los strings a números

      // Cuando se selecciona un instrumento, se agrega a la lista de asignaturas
        const instrumentSubject = this.subjects.find(
          (subject) => subject.name === 'Instrumento'
        );
        if (instrumentSubject && this.selectedInstrumentId) {

          // Agregar la asignatura de instrumento al array de asignaturas seleccionadas
          selectedSubjects.push(instrumentSubject.id);

         /*   const instrumentSubjectData: Subject = {
             id: instrumentSubject.id, // Usamos el id del "Instrumento"
             nombre: 'Instrumento',
             instrumentId: this.selectedInstrumentId, // El id del instrumento seleccionado
           };
           // Agregar la asignatura de instrumento al array de asignaturas seleccionadas
           selectedSubjects.push(instrumentSubjectData.id); */
        }

      console.log('Asignaturas seleccionadas:', selectedSubjects);

      const tuitionData: Tuition = {
        // operador de propagacion. Copia todos los valores de form.value
        ...form.value,
        subjects: selectedSubjects,
      };
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

  // Método para manejar los cambios en checkbox de asignaturas
  onClickCheckbox(subjectId: number) {
    this.checkedSubjects[subjectId] = !this.checkedSubjects[subjectId];
    console.log('onClickCheckbox:', this.checkedSubjects);
  }
  // Método para manejar los cambios en el select de instrumentos
  onInstrumentChange(instrumentId: number | null) {
    this.selectedInstrumentId = instrumentId;
    console.log('Instrumento seleccionado:', this.selectedInstrumentId);
  }
}
