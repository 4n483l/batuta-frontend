import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/courses/course.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-admin',
  templateUrl: './course-admin.component.html',
  styleUrls: ['./course-admin.component.scss'],
})
export class CourseAdminComponent implements OnInit {
  currentList: any[] = [];
  isLoading: boolean = false;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.loadCourses();
  }
  loadCourses(): void {
    this.isLoading = true;

    this.courseService.getCourses().subscribe(
      (data: any) => {
        this.currentList = data.Courses || [];
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        console.error('Error al cargar cursos:', error);
        Swal.fire({
          title: 'Error al cargar cursos',
          text: 'Hubo un problema al cargar los cursos. Intenta nuevamente.',
          icon: 'error',
        });
      }
    );
  }

  deleteCourse(id: number): void {
    Swal.fire({
      title: `¿Estás seguro de que quieres eliminar el curso?`,
      text: '¡Esta acción no se puede deshacer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4b6584',
      cancelButtonColor: '#c85a42',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.courseService.deleteCourse(id).subscribe({
          next: () => {
            // Filtra la lista actual para eliminar el curso
            this.currentList = this.currentList.filter(
              (course) => course.id !== id
            );
            Swal.fire({
              title: '¡Eliminado!',
              text: `El curso ha sido eliminado.`,
              icon: 'success',
            });
          },
          error: (error) => {
            console.error('Error eliminando el curso:', error);
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al eliminar el curso. Inténtalo de nuevo más tarde.',
              icon: 'error',
            });
          },
        });
      }
    });
  }
}
