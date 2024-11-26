import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/notes/note.service';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

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

  generatePdf() {
    const data = document.getElementById('nota')!;
    html2canvas(data).then((canvas) => {
      const contentDataURL = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const width = pdf.internal.pageSize.getWidth();
      const height = pdf.internal.pageSize.getHeight();
      pdf.addImage(contentDataURL, 'PNG', 0, 0, width, height);
      pdf.save('note.pdf');
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
