import { Component, OnInit } from '@angular/core';
import { Subject } from 'src/app/models/subject.model';
import { SubjectService } from 'src/app/services/subjects/subject.service';

@Component({
  selector: 'app-subject-admin',
  templateUrl: './subject-admin.component.html',
  styleUrls: ['./subject-admin.component.scss'],
})
export class SubjectAdminComponent implements OnInit {
  subjectsList: Subject[] = [];
  isLoading: boolean = true;

  constructor(private subjectService: SubjectService) {}

  ngOnInit(): void {
    this.loadSubjects();
  }

  loadSubjects(): void {
    this.subjectService.getSubjects().subscribe((data: any) => {
      this.subjectsList = Array.isArray(data.subjects) ? data.subjects : [];
      this.isLoading = false;
    });
  }

  deleteSubject(id: number, name: string): void {
    const confirmMessage = `¿Estás seguro de que deseas eliminar esta asignatura: "${name}"?`;

    if (confirm(confirmMessage)) {
      this.subjectService.deleteSubject(id).subscribe(() => {
        alert('Asignatura eliminada correctamente');
        this.loadSubjects();
      });
    }
  }
}
