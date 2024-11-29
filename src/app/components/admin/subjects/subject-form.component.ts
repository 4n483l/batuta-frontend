import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'src/app/models/subject.model';
import { SubjectService } from 'src/app/services/subjects/subject.service';

@Component({
  selector: 'app-subject-form',
  templateUrl: './subject-form.component.html',
  // styleUrls: ['./subject-form.component.scss'],
})
export class SubjectFormComponent implements OnInit {
  subject: Subject = { id: 0, name: '', level: '' };

  constructor(
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.subjectService.getSubjectById(+id).subscribe((data) => {
        this.subject = data;
      });
    }
  }

  saveSubject(): void {
    if (this.subject.id === 0) {
      // Crear nueva asignatura
      this.subjectService.createSubject(this.subject).subscribe(() => {
        this.router.navigate(['/admin/subject-admin']);
      });
    } else {
      // Editar asignatura existente
      this.subjectService.updateSubject(this.subject).subscribe(() => {
        this.router.navigate(['/admin/subject-admin']);
      });
    }
  }

  closeForm(): void {
    this.router.navigate(['/admin/subject-admin']);
  }
}
