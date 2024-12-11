import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ROUTES } from 'src/app/config/api-routes';
import { AuthService } from '../auth/auth.service';
import { Note } from 'src/app/models/note.model';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private notesUrl = API_ROUTES.notes;
  private teacherSubjectsUrl = API_ROUTES.teacherSubjects;
  private teacherInstrumentsUrl = API_ROUTES.teacherInstruments;
  private subjectInstrumentUrl = API_ROUTES.subjectInstrumet;



  constructor(private http: HttpClient, private authService: AuthService) {

  }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken() || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getNotes(): Observable<any> {
    return this.http.get(this.notesUrl, {
      headers: this.getHeaders(),
    });
  }
  saveNote(note: any): Observable<any> {
    return this.http.post(this.notesUrl, note, {
      headers: this.getHeaders(),
    });
  }
  getNoteById(id: number): Observable<any> {
    return this.http.get(`${this.notesUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  updateNote(id: number, note: any): Observable<any> {
    return this.http.put(`${this.notesUrl}/${id}`, note, {
      headers: this.getHeaders(),
    });
  }

  getSubjectsForTeacher(): Observable<any> {
    return this.http.get(this.teacherSubjectsUrl, {
      headers: this.getHeaders(),
    });
  }

  getInstrumentsForTeacher(): Observable<any> {
    return this.http.get(this.teacherInstrumentsUrl, {
      headers: this.getHeaders(),
    });
  }

  getSubjectsAndInstruments(): Observable<any> {
    return this.http.get(this.subjectInstrumentUrl, {
      headers: this.getHeaders(),
    });
  }

  deleteNoteById(id: number): Observable<void> {
    return this.http.delete<void>(`${this.notesUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
