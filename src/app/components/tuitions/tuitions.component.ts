import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { TuitionService } from 'src/app/services/tuitions/tuition.service';
import { Tuition } from 'src/app/models/tuition.model';
import { SubjectService } from 'src/app/services/subjects/subject.service';
import { Subject } from 'src/app/models/subject.model';
import { Instrument } from 'src/app/models/instrument.model';
import { InstrumentService } from 'src/app/services/instruments/instrument.service';
import Swal from 'sweetalert2';

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
    this.loadInstruments();
    this.loadSubjects();
    this.initCheckbox();
    this.loadLoggedUser();
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

      const tuitionData: Tuition = {
        // operador de propagacion. Copia todos los valores de form.value
        ...form.value,
        subjects: selectedSubjects,
      };

      this.tuitionService.postTuition(tuitionData).subscribe(
        (data: any) => {
          this.router.navigate(['/dashboard']);
          Swal.fire({
            title: 'Matrícula realizada con éxito',
            icon: 'success',
            confirmButtonColor: '#4b6584',
          });
        },
        (error) => {
          //  console.error('Error al realizar la matrícula:', error);
          Swal.fire({
            title: 'Error al realizar la matrícula',
            text: 'Hubo un problema al procesar tu matrícula. Intenta de nuevo más tarde.',
            icon: 'error',
            confirmButtonColor: '#c85a42',
          });
        }
      );
    } else {
      Swal.fire({
        title: 'Por favor, completa correctamente el formulario',
        icon: 'error',
        confirmButtonColor: '#c85a42',
      });
    }
  }

  loadInstruments() {
    this.instrumentService.getInstruments().subscribe((dataInstrument: any) => {
      this.instrumentos = dataInstrument.instruments;
      this.isInstrumentLoading = false;
    });
  }
  loadSubjects() {
    this.subjectService.getSubjects().subscribe((dataSubject: any) => {
      this.asignaturas = dataSubject.subjects;
      this.isSubjectLoading = false;
    });
  }
  loadLoggedUser() {
    // trae los datos del usuario logueado al formulario para facilitar la matricula
    this.tuitionService.getTuitions().subscribe((data: any) => {
      this.phone = data.usuario.phone;
      this.address = data.usuario.address;
      this.city = data.usuario.city;
      this.postal_code = data.usuario.postal_code;
      this.email = data.usuario.email;

      this.isUserLoading = false;
    });
  }

  initCheckbox() {
    this.asignaturas.forEach((subject) => {
      if (subject.name !== 'Instrumento') {
        this.checkedSubjects[subject.id] = false;
      }
    });
  }

  onClickCheckbox(subjectId: number) {
    this.checkedSubjects[subjectId] = !this.checkedSubjects[subjectId];
  }
  onInstrumentChange(instrumentId: number | null) {
    this.selectedInstrumentId = instrumentId;
  }
}
