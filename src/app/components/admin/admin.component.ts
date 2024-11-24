import { Component, OnInit } from '@angular/core';
import { Concert } from 'src/app/models/concert.model';
import { ConcertService } from 'src/app/services/concerts/concert.service';
import { RehearsalService } from 'src/app/services/rehearsals/rehearsal.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  selectedTab: string = '';
  selectedConcert: Concert | null = null;
  isFormVisible: boolean = false;

  constructor(
    private concertService: ConcertService,
    private rehearsalService: RehearsalService
  ) {}

  ngOnInit(): void {

  }

  // Funciones para cambiar la vista del formulario
  showConcertForm() {
    this.selectedTab = 'concerts';
    console.log('Tab seleccionada showConcert: ', this.selectedTab);
    this.isFormVisible = true;
  }

  showRehearsalForm() {
    this.selectedTab = 'rehearsals';
    this.isFormVisible = true;
  }

  showExamsForm() {
    this.selectedTab = 'exams';
    this.isFormVisible = true;
  }

  showCoursesForm() {
    this.selectedTab = 'courses';
    this.isFormVisible = true;
  }

  abrirFormulario(concert?: Concert): void {
    this.selectedConcert = concert ? { ...concert } : this.createEmptyConcert();
    this.isFormVisible = true;
  }

  guardarConcert(): void {
    if (!this.selectedConcert) return;

    if (this.selectedConcert.id) {
      // Actualizar
      this.concertService.updateConcert(this.selectedConcert).subscribe(() => {
        this.loadConcerts();
        this.cerrarFormulario();
      });
    } else {
      // Crear nuevo
      this.concertService.createConcert(this.selectedConcert).subscribe(() => {
        this.loadConcerts();
        this.cerrarFormulario();
      });
    }
  }

  eliminarConcert(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este concierto?')) {
      this.concertService.deleteConcert(id).subscribe(() => {
        this.loadConcerts();
      });
    }
  }

  cerrarFormulario(): void {
    this.selectedConcert = null;
    this.isFormVisible = false;
  }

  createEmptyConcert(): Concert {
    return {
      id: 0,
      title: '',
      place: '',
      date: new Date().toISOString().split('T')[0], // Fecha predeterminada (hoy)
      hour: '',
    };
  }

  loadConcerts(): void {
    this.concertService.getConcerts().subscribe((data: any) => {
      console.log('Respuesta de la API:', data);
      // Actualiza los conciertos en tu componente
    });
  }
}
