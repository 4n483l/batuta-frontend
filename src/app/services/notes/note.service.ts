import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ROUTES } from 'src/app/config/api-routes';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private notesUrl = API_ROUTES.notes;
  private teacherSubjectsUrl = API_ROUTES.teacherSubjects;
  private teacherInstrumentsUrl = API_ROUTES.teacherInstruments;
  private subjectInstrumentUrl = API_ROUTES.subjectInstrumet;

  // notesUpdated = new EventEmitter<void>();

  private token?: string = '';
  headers: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = this.authService.getToken() || '';
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  }

  getNotes(): Observable<any> {
    return this.http.get(this.notesUrl, {
      headers: this.headers,
    });
  }
  saveNote(note: any): Observable<any> {
    return this.http.post(this.notesUrl, note, {
      headers: this.headers,
    });
  }

  getSubjectsForTeacher(): Observable<any> {
    return this.http.get(this.teacherSubjectsUrl, {
      headers: this.headers,
    });
  }

  getInstrumentsForTeacher(): Observable<any> {
    return this.http.get(this.teacherInstrumentsUrl, {
      headers: this.headers,
    });
  }

  getSubjectsAndInstruments(): Observable<any> {
    return this.http.get(this.subjectInstrumentUrl, {
      headers: this.headers,
    });
  }

  /* triggerNotesUpdate() {
    this.notesUpdated.emit();
  } */
}
