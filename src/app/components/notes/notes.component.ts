import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
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
  viewNotes: boolean = false;

  constructor(
    private http: HttpClient,
    private noteService: NoteService,
    private router: Router,
    private authService: AuthService,
    private route: ActivatedRoute
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
        });
      }
    });
  }
  ngAfterViewInit(): void {
    // Verifica si la ruta es '/notes', solo entonces carga las notas
    if (this.router.url.includes('notes')) {
      this.loadNotes();
    }
  }

  loadNotes(): void {
    this.viewNotes = true;
    this.isLoading = true;

    this.noteService.getNotes().subscribe(
      (data: any) => {
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

        if (this.viewNotes && this.notesList.length === 0) {
          Swal.fire({
            title: 'No hay apuntes disponibles',
            text: 'No hay apuntes disponibles para mostrar.',
            icon: 'info',
            timer: 1500,
            confirmButtonColor: '#4b6584',
            showConfirmButton: false,
          });
        }
      },
      (error) => {
        // console.error('Error al cargar los apuntes:', error);
        Swal.fire({
          title: 'Error al cargar apuntes',
          text: 'Hubo un problema al cargar los apuntes. Intenta de nuevo más tarde.',
          icon: 'error',
          timer: 1500,
          confirmButtonColor: '#4b6584',
          showConfirmButton: false,
        });
        this.isLoading = false;
      }
    );
  }

  addNote(): void {
    this.router.navigate(['/note-form']);
  }

  seePdf(link: string): void {
    const cleanUrl = `${this.pdfUrl}/${link}`.replace(/([^:]\/)\/+/g, '$1');
    window.open(cleanUrl, '_blank');
  }

  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }
}
