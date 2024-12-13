import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { NoteService } from 'src/app/services/notes/note.service';
import jsPDF from 'jspdf';
import { ActivatedRoute, Router } from '@angular/router';
import { Note } from 'src/app/models/note.model';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

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

    if (this.noteId) {
      this.isEditMode = true;
      this.loadNote(Number(this.noteId));
    } else {
      this.isEditMode = false;
    }
  }

  onSubmit() {
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
        Swal.fire({
          title: 'Error al cargar instrumentos',
          text: 'Hubo un problema al cargar los instrumentos. Intenta de nuevo más tarde.',
          icon: 'error',
          confirmButtonColor: '#4b6584',
        });
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
        Swal.fire({
          title: 'Error al cargar asignaturas',
          text: 'Hubo un problema al cargar las asignaturas. Intenta de nuevo más tarde.',
          icon: 'error',
          confirmButtonColor: '#4b6584',
        });
        this.setLoadingState(false);
      }
    );
  }

  loadNote(id: number) {
    this.noteService.getNoteById(id).subscribe(
      (response: any) => {
        this.note = response.note;
      },
      (error) => {
        Swal.fire({
          title: 'Error al cargar la nota',
          text: 'Hubo un problema al cargar la nota. Intenta de nuevo más tarde.',
          icon: 'error',
          confirmButtonColor: '#4b6584',
        });
      }
    );
  }

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
        Swal.fire({
          title: 'Nota actualizada',
          text: 'La nota se actualizó correctamente.',
          icon: 'success',
          confirmButtonColor: '#4b6584',
        });
        this.router.navigate(['/notes']);
      },
      (error) => {
        // console.error(error);
        Swal.fire({
          title: 'Error al actualizar nota',
          text: 'Hubo un problema al actualizar la nota. Intenta de nuevo más tarde.',
          icon: 'error',
          confirmButtonColor: '#4b6584',
        });
      }
    );
  }

  saveNotePdf() {
    //  console.log('Nota antes de enviar:', this.note);

    if (!this.note.title || !this.note.topic || !this.note.content) {
      Swal.fire({
        title: 'Campos incompletos',
        text: 'Por favor, completa todos los campos antes de guardar.',
        icon: 'warning',
        confirmButtonColor: '#4b6584',
      });
      return;
    }

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
          Swal.fire({
            title: 'Nota actualizada',
            text: 'La nota se actualizó correctamente.',
            icon: 'success',
            confirmButtonColor: '#4b6584',
          });
          this.router.navigate(['/notes']);
        },
        (error) => {
          // console.error(error);
          Swal.fire({
            title: 'Error al actualizar nota',
            text: 'Hubo un problema al actualizar la nota. Intenta de nuevo más tarde.',
            icon: 'error',
            confirmButtonColor: '#4b6584',
          });
        }
      );
    } else {
      this.noteService.saveNote(notePdf).subscribe(
        (response) => {
          Swal.fire({
            title: 'Nota guardada',
            text: 'La nota se guardó correctamente.',
            icon: 'success',
            confirmButtonColor: '#4b6584',
          });
          this.router.navigate(['/notes']);

          console.log('dentro saveNote:', response);
        },
        (error) => {
          //console.error(error);
          Swal.fire({
            title: 'Error al guardar nota',
            text: 'Hubo un problema al guardar la nota. Intenta de nuevo más tarde.',
            icon: 'error',
            confirmButtonColor: '#4b6584',
          });
        }
      );
    }
  }

  generatePdf() {
    if (!this.note.title || !this.note.topic || !this.note.content) {
      Swal.fire({
        title: 'Error al generar PDF',
        text: 'Faltan datos para generar el PDF. Asegúrate de completar todos los campos.',
        icon: 'error',
        confirmButtonColor: '#4b6584',
      });
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
