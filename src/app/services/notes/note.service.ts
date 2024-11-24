import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ROUTES } from 'src/app/config/api-routes';

@Injectable({
  providedIn: 'root',
})
export class NoteService {
  private notesUrl = API_ROUTES.notes;

  constructor(private http: HttpClient) {}

  createNote(note: any): Observable<any> {
    return this.http.post(this.notesUrl, note, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  saveAsPdf(note: any): Observable<any> {
    return this.http.post(`${this.notesUrl}/generate-pdf`, note);
  }
}
