import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-admin',
  templateUrl: './student-admin.component.html',
  styleUrls: ['./student-admin.component.scss'],
})
export class StudentAdminComponent implements OnInit {
  students: any[] = [];
  isLoading: boolean = true;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadStudents();
  }

  loadStudents(): void {
    this.authService.getStudents().subscribe(
      (response: any) => {
        this.students = response.Students;
        this.isLoading = false;
      },
      (error) => {
     console.error('Error al cargar los estudiantes:', error);
        this.isLoading = false;
      }
    );
  }

  deleteStudent(studentId: number, name: string, lastname: string): void {
    Swal.fire({
      title: `¿Estás seguro de que deseas eliminar al estudiante "${name} ${lastname}"?`,
      text: '¡Esta acción no se puede deshacer!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4b6584',
      cancelButtonColor: '#c85a42',
      confirmButtonText: 'Sí, eliminar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.authService.deleteStudent(studentId).subscribe(
          () => {
            Swal.fire({
              title: '¡Estudiante eliminado!',
              text: `${name} ${lastname} ha sido eliminado correctamente.`,
              icon: 'success',
            });
            this.loadStudents();
          },
          (error) => {
            Swal.fire({
              title: 'Error al eliminar estudiante',
              text: 'Hubo un problema al intentar eliminar al estudiante. Intenta nuevamente.',
              icon: 'error',
            });
          }
        );
      }
    });
  }
}
