import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  private subjectsUrl = 'http://localhost:8000/api/subjects';

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

  getSubjects(): Observable<any> {
    return this.http.get<any>(this.subjectsUrl, {
      headers: this.headers,
    });
  }

  getInstruments(): Observable<any> {
    return this.http.get<any>(this.subjectsUrl+'/instruments', {
      headers: this.headers,
    });
  }
}
