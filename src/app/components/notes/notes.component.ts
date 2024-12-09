import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API_ROUTES } from 'src/app/config/api-routes';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NoteService } from 'src/app/services/notes/note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  notesList: any[] = [];
  private pdfUrl = API_ROUTES.pdf;

  userType: string = '';
  isLoggedIn: boolean = false;
  isLoading: boolean = true;

  constructor(
    private http: HttpClient,
    private noteService: NoteService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadUserType();
  }

  loadUserType(): void {
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;

      if (this.isLoggedIn) {
        this.authService.getUserData().subscribe((userData) => {
          this.userType = userData.user_type;
          this.getNotesData();
        });
      }
    });
  }

 // obtiene los apuntes de teacher y de student
  getNotesData(): void {
    this.noteService.getNotes().subscribe((data: any) => {

      console.log('Data todos apuntes:', data);

      if (this.userType === 'teacher') {


        this.notesList = data.NotesTeacher;

      } else {
        console.log('Data asignaturas:', data);

        this.notesList = [];

        for (let studentId in data.notesStudent) {
          const apuntesAlumno = data.notesStudent[studentId];

          apuntesAlumno.forEach((apunte: any) => {
            this.notesList.push(apunte);
          });
        }

      }
      this.isLoading = false;
    //  console.log('Data notes:', data);
    });
  }
// crea un apunte nuevo
  addNote(): void {
    this.router.navigate(['/note-form']);
  }

  seePdf(link: string): void {
    window.open(`${this.pdfUrl}/${link}`, '_blank');
    console.log('Link:', link);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }
}
