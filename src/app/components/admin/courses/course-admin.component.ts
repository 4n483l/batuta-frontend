import { Component, OnInit } from '@angular/core';
import { CourseService } from 'src/app/services/courses/course.service';
import { DatePipe } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-course-admin',
  templateUrl: './course-admin.component.html',
  styleUrls: ['./course-admin.component.scss'],
  providers: [DatePipe],
})
export class CourseAdminComponent implements OnInit {
  currentList: any[] = [];
  isLoading: boolean = false;

  constructor(private courseService: CourseService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.isLoading = true;

    this.courseService.getCourses().subscribe(
      (data: any) => {
        this.currentList =
          data.Courses.map((course: any) => {
            course.date = this.datePipe.transform(course.date, 'dd-MM-yyyy');
            return course;
          }) || [];
        this.isLoading = false;
      },
      (error) => {
        this.isLoading = false;
        console.error('Error al cargar clases:', error);

      }
    );
  }

  deleteCourse(id: number): void {
    Swal.fire({
      title: `¿Estás seguro de que quieres eliminar la clase?`,
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
            // Filtra la lista actual para eliminar la clase
            this.currentList = this.currentList.filter(
              (course) => course.id !== id
            );
            Swal.fire({
              title: '¡Eliminado!',
              text: `La clase ha sido eliminada.`,
              icon: 'success',
            });
          },
          error: (error) => {
            console.error('Error eliminando la clase:', error);
            Swal.fire({
              title: 'Error',
              text: 'Hubo un problema al eliminar la clase. Inténtalo de nuevo más tarde.',
              icon: 'error',
            });
          },
        });
      }
    });
  }
}
