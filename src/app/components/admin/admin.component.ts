import { Component, OnInit } from '@angular/core';
import { ConcertService } from 'src/app/services/concerts/concert.service';
import { RehearsalService } from 'src/app/services/rehearsals/rehearsal.service';
import { CourseService } from 'src/app/services/courses/course.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  selectedTab: string = 'concerts';
  currentList: any[] = [];

  constructor(
    private concertService: ConcertService,
    private rehearsalService: RehearsalService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  switchTab(tab: string): void {
    this.selectedTab = tab;
    this.loadData();
  }

  loadData(): void {
    switch (this.selectedTab) {
      case 'concerts':
        this.concertService.getConcerts().subscribe((data: any) => {
          this.currentList = Array.isArray(data.Concerts) ? data.Concerts : [];
        });
        break;
      case 'rehearsals':
        this.rehearsalService.getRehearsals().subscribe((data: any) => {
          this.currentList = data;
        });
        break;
      case 'courses':
        this.courseService.getCourses().subscribe((data: any) => {
          this.currentList = data;
        });
        break;
      case 'exams':
        // Aquí podrías agregar el servicio de exámenes
        this.currentList = []; // Placeholder
        break;
    }
  }

  getTabTitle(): string {
    switch (this.selectedTab) {
      case 'concerts':
        return 'Gestión de Conciertos';
      case 'rehearsals':
        return 'Gestión de Ensayos';
      case 'courses':
        return 'Gestión de Cursos';
      case 'exams':
        return 'Gestión de Exámenes';
      default:
        return 'Administración';
    }
  }

  addItem(): void {
    console.log('Agregar nuevo item a', this.selectedTab);
    // Redirige o abre un formulario para agregar
  }

  editItem(item: any): void {
    console.log('Editar:', item);
    // Redirige o abre un formulario con los datos del item seleccionado
  }

  deleteItem(id: number): void {
    if (confirm('¿Estás seguro de eliminar este elemento?')) {
      console.log('Eliminar ID:', id);
      // Implementa la lógica para eliminar
    }
  }
}
