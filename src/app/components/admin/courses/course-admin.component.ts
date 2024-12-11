import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course.model';
import { CourseService } from 'src/app/services/courses/course.service';

@Component({
  selector: 'app-course-admin',
  templateUrl: './course-admin.component.html',
  styleUrls: ['./course-admin.component.scss'],
})
export class CourseAdminComponent implements OnInit {
  currentList: any[] = [];
  isLoading: boolean = true;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe((data: any) => {
      this.currentList = Array.isArray(data.Courses) ? data.Courses : [];
      this.isLoading = false;
      console.log('Cursos cargados:', data);
    });
  }

  deleteCourse(id: number): void {
    if (confirm('¿Estás seguro de que quieres eliminar este curso?')) {
      this.courseService.deleteCourse(id).subscribe({
        next: () => {
          this.currentList = this.currentList.filter(
            (course) => course.id !== id
          );
          alert('Curso eliminado correctamente');
        },
        error: (error) => {
          console.error('Error eliminando el curso:', error);
          alert(
            'Hubo un problema al eliminar el curso. Inténtalo de nuevo más tarde.'
          );
        },
      });
    }
  }
}
