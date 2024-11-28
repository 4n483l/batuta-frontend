import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/notes/note.service';
import jsPDF from 'jspdf';


@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.scss'],
})
export class NoteEditorComponent implements OnInit {
  note = { title: '', topic: '', content: '', subject_id: '' };

  constructor(private noteService: NoteService) {}

  ngOnInit(): void {
    console.log('NoteEditorComponent cargado');
  }

  createNote() {
    this.noteService.createNote(this.note).subscribe((response) => {
      this.note = response.note;
      console.log(response);
    });
  }

  /*   createNote() {
    this.noteService.createNote(this.note).subscribe(
      (response) => {
        console.log(response); // Debes ver el apunte creado en la consola
      },
      (error) => {
        console.log(error); // Si hay un error, lo verás aquí
      }
    );
  } */

  saveAsPdf() {
    this.noteService.saveAsPdf(this.note).subscribe((response) => {
      window.open(response.pdf_url); // Abrir en una nueva pestaña
      console.log(response);
    });
  }
}
