import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth/auth.service';

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
        console.log('Estudiantes cargados:', this.students);
      },
      (error) => {
        console.error('Error al cargar estudiantes:', error);
        this.isLoading = false;
      }
    );
  }

  deleteStudent(studentId: number, name: string, lastname: string): void {
    const confirmMessage = `¿Estás seguro de que deseas eliminar al estudiante "${name} ${lastname}"?`;

    if (confirm(confirmMessage)) {
      this.authService.deleteStudent(studentId).subscribe(() => {
        alert('Estudiante eliminado');
        this.loadStudents();
      });
    }
  }
}
