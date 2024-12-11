import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NoteService } from 'src/app/services/notes/note.service';
import jsPDF from 'jspdf';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from 'src/app/models/note.model';
import { NgForm } from '@angular/forms';

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
  @ViewChild('noteForm') noteForm!: NgForm;

  isLoading: boolean = true;
  isEditMode: boolean = false;

  noteId: string | null = '';

  constructor(
    private noteService: NoteService,
    private router: Router,
    private cdRef: ChangeDetectorRef,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.loadSubjects();
    this.loadInstruments();

    this.noteId = this.route.snapshot.paramMap.get('id');
    console.log('noteId:', Number(this.noteId));
    if (this.noteId) {
      this.isEditMode = true;
      this.loadNote(Number(this.noteId));
    } else {
      this.isEditMode = false;
    }
  }

  onSubmit() {
    console.log('Esto es nota onSubmit:', this.note);

    this.saveNotePdf();
  }

  // hook ciclo de vida. Se ejecuta después de que Angular haya inicializado las vistas del componente
  ngAfterViewInit() {
    // datos cambian fuera del ciclo de vida, fuerza la detección de cambios que no son detectados automáticamente
    this.cdRef.detectChanges();
  }
  ngAfterViewChecked() {
    this.cdRef.detectChanges();
  }

  loadInstruments() {
    this.noteService.getInstrumentsForTeacher().subscribe(
      (response: any) => {
        this.instrumentos = response.instruments;
        this.setLoadingState(false);
      },
      (error) => {
        console.error('Error al cargar instrumentos:', error);
        this.setLoadingState(false);
      }
    );
  }

  loadSubjects() {
    this.noteService.getSubjectsForTeacher().subscribe(
      (response: any) => {
        this.asignaturas = response.subjects;
        this.setLoadingState(false);
      },
      (error) => {
        console.error('Error al cargar asignaturas:', error);
        this.setLoadingState(false);
      }
    );
  }

  loadNote(id: number) {
    this.noteService.getNoteById(id).subscribe(
      (response: any) => {
        this.note = response.note;
         console.log('Nota cargada para edición:', this.note);
      },
      (error) => {
        console.error('Error al cargar apunte:', error);
      }
    );
  }

  // comprueba si se ha seleccionado un instrumento o una asignatura
  disableInstrumentSelect() {
    if (this.note.subject_id) {
      this.note.instrument_id = '';
    }
  }
  disableSubjectSelect() {
    if (this.note.instrument_id) {
      this.note.subject_id = '';
    }
  }

  // validación del formulario para botón de envío
  get isSubmitDisabled(): boolean {
    return (
      ((!this.note.subject_id && !this.note.instrument_id) ||
        this.noteForm?.invalid) ??
      false // para evitar null
    );
  }

  setLoadingState(state: boolean): void {
    this.isLoading = state;
    this.cdRef.detectChanges();
  }

  previewPdf() {
    this.generatePdf();
    this.pdf.save('note.pdf');
  }

  editNotePdf(noteId: number) {
    this.generatePdf();
    this.isEditMode = true;

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

    this.noteService.updateNote(noteId, notePdf).subscribe(
      (response) => {
        this.router.navigate(['/notes']);
        console.log('dentro updateNote:', response);
      },
      (error) => {
        console.error(error);
      }
    );
  }

  saveNotePdf() {
 console.log('Nota antes de enviar:', this.note);

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

    if (this.isEditMode) {
      this.noteService.updateNote(Number(this.noteId), notePdf).subscribe(
        (response) => {
            console.log('Nota actualizada exitosamente:', response);
          this.router.navigate(['/notes']);

        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.noteService.saveNote(notePdf).subscribe(
        (response) => {
          this.router.navigate(['/notes']);
          

          console.log('dentro saveNote:', response);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  }

  /*  saveNotePdf2() {
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

    if (this.isEditMode) {
     // console.log('dentro updateNote:', Number(this.noteId));
      console.log('parte updateNote:', notePdf.getAll('title'));
      console.log('parte updateNote:', notePdf.getAll('topic'));
      console.log('parte updateNote:', notePdf.getAll('content'));
      console.log('parte updateNote:', notePdf.getAll('subject_id'));
      console.log('parte updateNote:', notePdf.getAll('instrument_id'));
      console.log('parte updateNote:', notePdf.getAll('pdf'));

      this.noteService.updateNote(Number(this.noteId), notePdf).subscribe(
        (response) => {
          this.router.navigate(['/notes']);
          console.log('dentro updateNote:', response);
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      this.noteService.saveNote(notePdf).subscribe(
        (response) => {
          this.router.navigate(['/notes']);
          console.log('dentro saveNote:', response);
        },
        (error) => {
          console.error(error);
        }
      );
    }
  } */

  generatePdf() {
 if (!this.note.title || !this.note.topic || !this.note.content) {
   console.error('Error: No se puede generar el PDF, faltan datos');
   return;
 }


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
}
