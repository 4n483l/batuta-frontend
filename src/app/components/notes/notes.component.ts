import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { API_ROUTES } from 'src/app/config/api-routes';
import { AuthService } from 'src/app/services/auth/auth.service';
import { NoteService } from 'src/app/services/notes/note.service';
import Swal from 'sweetalert2';

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
        this.authService.getUserData().subscribe(
          (userData) => {
            this.userType = userData.user_type;
            this.getNotesData();
          },
          (error) => {
             console.error('Error al obtener los datos del usuario:', error);
            Swal.fire({
              title: 'Error de autenticación',
              text: 'Hubo un problema al obtener los datos del usuario. Intenta de nuevo más tarde.',
              icon: 'error',
              confirmButtonColor: '#4b6584',
            });
          }
        );
      }
    });
  }

  // obtiene los apuntes de teacher y de student
  getNotesData(): void {
    this.noteService.getNotes().subscribe((data: any) => {


      if (this.userType === 'teacher') {
        this.notesList = data.NotesTeacher;
      } else {


        this.notesList = [];

        for (let studentId in data.notesStudent) {
          const apuntesAlumno = data.notesStudent[studentId];

          apuntesAlumno.forEach((apunte: any) => {
            this.notesList.push(apunte);
          });
        }
      }
      this.isLoading = false;

    }, (error) => {
       // console.error('Error al cargar los apuntes:', error);
       Swal.fire({
         title: 'Error al cargar apuntes',
         text: 'Hubo un problema al cargar los apuntes. Intenta de nuevo más tarde.',
         icon: 'error',
         confirmButtonColor: '#4b6584',
       });
       this.isLoading = false;
    }
  );
  }

  addNote(): void {
    this.router.navigate(['/note-form']);
  }

  seePdf(link: string): void {

    window.open(`${this.pdfUrl}/${link}`, '_blank');
   // console.log('Link:', link);
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }
}
