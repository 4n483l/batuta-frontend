import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-admin.component.scss'],
})
export class StudentFormComponent implements OnInit {
  student: any = {};
  users: any[] = [];

  isEditMode: boolean = false;
  isLoading: boolean = false;

  constructor(
    private authService: AuthService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const studentId = this.route.snapshot.paramMap.get('id');

    if (studentId) {
      this.isEditMode = true;
      this.loadStudent(studentId);
    } else {
      this.isEditMode = false;
    }

    this.loadUsers();
  }

  loadStudent(studentId: string): void {
    this.isLoading = true;
    this.authService.getStudentById(studentId).subscribe(
      (response: any) => {
        this.student = response.Student;
        this.isLoading = false;
      },
      (error) => {

     console.error('Error al cargar el estudiante:', error);
             this.isLoading = false;
      }
    );
  }

  loadUsers(): void {
    this.authService.getUsers().subscribe(
      (response: any) => {
        this.users = response.Users;
      },
      (error) => {
        console.error('Error al cargar los usuarios:', error);
      }
    );
  }

  saveStudent(): void {
    if (this.isEditMode) {
      this.authService.updateStudent(this.student.id, this.student).subscribe(
        (response) => {
          Swal.fire({
            title: 'Estudiante actualizado con éxito',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          });
          this.router.navigate(['/admin/student-admin']);
        },
        (error) => {
          Swal.fire({
            title: 'Error al actualizar estudiante',
            text: 'No se pudieron guardar los cambios.',
            icon: 'error',
          });
        }
      );
    } else {
      this.authService.createStudent(this.student).subscribe(
        (response) => {
          Swal.fire({
            title: 'Estudiante creado con éxito',
            icon: 'success',
            timer: 1500,
            showConfirmButton: false,
          });
          this.router.navigate(['/admin/student-admin']);
        },
        (error) => {
          Swal.fire({
            title: 'Error al crear estudiante',
            text: 'Hubo un problema al guardar los datos del estudiante.',
            icon: 'error',
          });
        }
      );
    }
  }

  closeForm(): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Si cierras el formulario, se perderán los cambios no guardados.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#4b6584',
      cancelButtonColor: '#c85a42',
      confirmButtonText: 'Sí, cerrar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/admin/student-admin']);
      }
    });
  }
}
