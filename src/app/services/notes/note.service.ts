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

  private token?: string = '';
  headers: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService) {
    // Obtener el token de autenticación
    this.token = this.authService.getToken() || '';
    // Crear los headers con el token de autenticación
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  }

  saveNote(note: any): Observable<any> {
    return this.http.post(this.notesUrl, note, {
      headers: this.headers,
    });
  }

  /*  saveAsPdf(note: any): Observable<any> {
    return this.http.post(`${this.notesUrl}/generate-pdf`, note);
  } */
}
