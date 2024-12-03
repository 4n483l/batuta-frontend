import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { API_ROUTES } from 'src/app/config/api-routes';
import { NoteService } from 'src/app/services/notes/note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
})
export class NotesComponent implements OnInit {
  notes: any[] = [];
  private pdfUrl = API_ROUTES.pdf;

  constructor(private http: HttpClient, private noteService: NoteService) {}

  ngOnInit(): void {
    this.getNotesData();
  }

  getNotesData(): void {
    this.noteService.getNotes().subscribe((data: any) => {
      this.notes = data.Notes;
      console.log('Data notes:', data);
    });
  }

  seePdf(link: string): void {
    window.open(
      `${this.pdfUrl}/${link}`, '_blank'
    );
    console.log('Link:', link);
  }

  // Función para formatear la fecha
  formatDate(dateString: string): string {
    const date = new Date(dateString);
    return date.toLocaleDateString();
  }
}
