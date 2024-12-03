import { Component, OnInit } from '@angular/core';
import { NoteService } from 'src/app/services/notes/note.service';
import jsPDF from 'jspdf';
import { Router } from '@angular/router';
import { Note } from 'src/app/models/note.model';

@Component({
  selector: 'app-note-form',
  templateUrl: './note-form.component.html',
  styleUrls: ['./note-form.component.scss'],
})
export class NoteFormComponent implements OnInit {
  note: Note = {
    title: '',
    topic: '',
    content: '',
    subject_id: '',
    instrument_id: '',
  };
  asignaturas: any[] = [];
  instrumentos: any[] = [];
  pdf = new jsPDF();

  constructor(private noteService: NoteService, private router: Router) {}

  ngOnInit(): void {
    this.loadSubjects();
    this.loadInstruments();
  }

  // Cargar solo instrumentos
  loadInstruments() {
    this.noteService.getInstrumentsForTeacher().subscribe(
      (response: any) => {
        this.instrumentos = response.instruments;
      },
      (error) => {
        console.error('Error al cargar instrumentos:', error);
      }
    );
  }

  /*
  loadSubjectsAndInstruments() {
    this.noteService.getSubjectsAndInstruments().subscribe(
      (response: any) => {
        // Combina asignaturas e instrumentos en una sola lista con identificadores distintos
        this.asignaturas = [
          ...response.subjects.map((subject: any) => ({
            id: `subject-${subject.id}`,
            name: subject.name,
          })),
          ...response.instruments.map((instrument: any) => ({
            id: `instrument-${instrument.id}`,
            name: instrument.name,
          })),
        ];
      },
      (error) => {
        console.error('Error al cargar asignaturas e instrumentos:', error);
      }
    );
  } */

  loadSubjects() {
    this.noteService.getSubjectsForTeacher().subscribe(
      (response: any) => {
        this.asignaturas = response.subjects;
      },
      (error) => {
        console.error('Error al cargar asignaturas:', error);
      }
    );
  }

  // Deshabilitar la selección de instrumento si se selecciona una asignatura
  disableInstrumentSelect() {
    if (this.note.subject_id) {
      this.note.instrument_id = ''; // Limpiar selección de instrumento
    }
  }

  // Deshabilitar la selección de asignatura si se selecciona un instrumento
  disableSubjectSelect() {
    if (this.note.instrument_id) {
      this.note.subject_id = ''; // Limpiar selección de asignatura
    }
  }

  onSubmit() {
    this.saveNotePdf();
    this.router.navigate(['/notes']);
  }

  generatePdf() {
    let yPosition = 10;
    // Obtener el tamaño de la página
    const width = this.pdf.internal.pageSize.width;
    const height = this.pdf.internal.pageSize.height;
    // Definir márgenes
    const marginLeft = 10;
    const marginRight = 10;
    const availableWidth =
      this.pdf.internal.pageSize.width - marginLeft - marginRight;

    const logoImage = 'assets/logo/logo.png';

    /* // Agregar marca de agua
    const watermarkImage = 'assets/pics/watermark.jpg';
    this.pdf.addImage(watermarkImage, 'PNG', 0, 0, width, height, undefined, 'NONE'); */

    // tamaño del logo
    const logoWidth = 30;
    const logoHeight = 30;

    // Calcular la posición del logo y título para que estén centrados en la parte superior
    const logoX = 10; // Posición fija en el eje X para el logo
    const titleX = width / 2 - this.pdf.getTextWidth(this.note.title) / 2; // Centramos el título en la página
    const titleY = 25; // Un poco hacia abajo para que no se solape con el logo

    this.pdf.addImage(logoImage, 'PNG', logoX, 10, logoWidth, logoHeight);

    // Título
    this.pdf.setFont('helvetica', 'bold');
    this.pdf.setFontSize(16);
    this.pdf.setTextColor(75, 101, 132);
    this.pdf.text(this.note.title, titleX, titleY);

    // Topic
    const topicX = width / 2 - this.pdf.getTextWidth(this.note.topic) / 2; // Centrado en la página
    const topicY = titleY + 20; // Colocar debajo del título
    this.pdf.setFont('helvetica', 'normal');
    this.pdf.setFontSize(14);
    this.pdf.text(this.note.topic, topicX, topicY);
    yPosition = topicY + 20;

    // Content
    const contenido = this.note.content.split('\n');

    this.pdf.setFontSize(12);
    this.pdf.setTextColor(50, 50, 50);

    contenido.forEach((line: string) => {
      // divide el texto en líneas para que quepa en la página
      const lines = this.pdf.splitTextToSize(line, availableWidth);
      lines.forEach((textLine: string) => {
        if (yPosition > 280) {
          this.pdf.addPage();
          yPosition = 10;
        }

        this.pdf.text(textLine, marginLeft, yPosition);
        yPosition += 10;
      });
    });
  }

  previewPdf() {
    this.generatePdf();
    this.pdf.save('note.pdf');
  }

  saveNotePdf() {
    this.generatePdf();

    const notePdf = new FormData();
    notePdf.append('title', this.note.title);
    notePdf.append('topic', this.note.topic);
    notePdf.append('content', this.note.content);

    if (this.note.subject_id) {
      notePdf.append('subject_id', this.note.subject_id);
    }

    if (this.note.instrument_id) {
      notePdf.append('instrument_id', this.note.instrument_id);
    }

    // Convertir el PDF generado a un archivo Blob y añadirlo al formulario
    const pdfBlob = this.pdf.output('blob');
    notePdf.append('pdf', pdfBlob, 'note.pdf');
    this.noteService.saveNote(notePdf).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
