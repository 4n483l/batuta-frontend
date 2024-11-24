import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TuitionService } from 'src/app/services/tuitions/tuition.service';
import { Tuition } from 'src/app/models/tuition.model';
import { SubjectService } from 'src/app/services/subjects/subject.service';
import { Subject } from 'src/app/models/subject.model';
import { Instrument } from 'src/app/models/instrument.model';
import { InstrumentService } from 'src/app/services/instruments/instrument.service';

@Component({
  selector: 'app-tuitions',
  templateUrl: './tuitions.component.html',
  styleUrls: ['./tuitions.component.scss'],
})
export class TuitionsComponent implements OnInit {
  // Inicializar datos
  name: string = '';
  lastname: string = '';
  dni: string = '';
  phone: string = '';
  address: string = '';
  city: string = '';
  postal_code: string = '';
  birth_date: string = '';
  email: string = '';

  asignaturas: Subject[] = [];
  checkedSubjects: { [key: number]: boolean } = {};
  instrumentos: Instrument[] = [];
  selectedInstrumentId: number | null = null;

  isUserLoading: boolean = true;
  isSubjectLoading: boolean = true;
  isInstrumentLoading: boolean = true;

  constructor(
    private router: Router,
    private tuitionService: TuitionService,
    private subjectService: SubjectService,
    private instrumentService: InstrumentService
  ) {}

  ngOnInit(): void {

    this.instrumentService.getInstruments().subscribe((dataInstrument: any) => {
      this.instrumentos = dataInstrument.instruments;
      this.isInstrumentLoading = false;
    });

    // trae las asignaturas del back
    this.subjectService.getSubjects().subscribe((dataSubject: any) => {
      console.log('Datos de asignaturas: ', dataSubject);
      this.asignaturas = dataSubject.subjects;
      this.isSubjectLoading = false;
    });
    // inicializar los checkbox
    this.asignaturas.forEach((subject) => {
      if (subject.name !== 'Instrumento') {
        this.checkedSubjects[subject.id] = false;
      }
    });

    // trae los datos del usuario logueado
    this.tuitionService.getTuitions().subscribe((data: any) => {
      console.log('Datos recibidos de la API:', data);

      // traemos los datos del usuario logueado
      this.phone = data.usuario.phone;
      this.address = data.usuario.address;
      this.city = data.usuario.city;
      this.postal_code = data.usuario.postal_code;
      this.email = data.usuario.email;

      console.log('Componente tuitions:', data.usuario);
      this.isUserLoading = false;
    });
  }

  onSubmit(form: NgForm) {
    if (form.valid) {
      const selectedSubjects = Object.keys(this.checkedSubjects)
        .filter((key) => this.checkedSubjects[+key])
        .map((key) => +key); // Convierte los strings a números

      // Cuando se selecciona un instrumento, se agrega a la lista de asignaturas
      const instrumentSubject = this.asignaturas.find(
        (subject) => subject.name === 'Instrumento'
      );

      if (instrumentSubject && this.selectedInstrumentId) {
        selectedSubjects.push(instrumentSubject.id); // TODO: agregar instrumento desde el backend
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

  onClickCheckbox(subjectId: number) {
    this.checkedSubjects[subjectId] = !this.checkedSubjects[subjectId];
  }
  onInstrumentChange(instrumentId: number | null) {
    this.selectedInstrumentId = instrumentId;
    console.log('Instrumento seleccionado:', this.selectedInstrumentId);
  }
}
