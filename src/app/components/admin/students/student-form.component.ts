import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';


@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-admin.component.scss'],
})
export class StudentFormComponent implements OnInit {
  student: any = {};
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
  }

   loadStudent(studentId: string): void {
    this.isLoading = true;
    this.authService.getStudentById(studentId).subscribe(
      (response: any) => {
        this.student = response.Student;
        this.isLoading = false;
      },
      (error) => {
        console.error('Error al cargar estudiante:', error);
        this.isLoading = false;
      }
    );
  }

   saveStudent(): void {
    if (this.isEditMode) {
      this.authService.updateStudent(this.student.id, this.student).subscribe(
        (response) => {
          alert('Estudiante actualizado');
          this.router.navigate(['/admin/student-admin']);
        },
        (error) => {
          console.error('Error al actualizar estudiante:', error);
        }
      );
    } else {
      this.authService.createStudent(this.student).subscribe(
        (response) => {
          alert('Estudiante creado');
          this.router.navigate(['/admin/student-admin']);
        },
        (error) => {
          console.error('Error al crear estudiante:', error);
        }
      );
    }
  }

  closeForm(): void {
    this.router.navigate(['/admin/student-admin']);
  }
}
