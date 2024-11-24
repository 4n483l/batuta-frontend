import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { Subject } from 'src/app/models/subject.model';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  private subjectsUrl = 'http://localhost:8000/api/subjects';
  //'http://panel.batuta.lo/api/subjects';

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

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.subjectsUrl, {
      headers: this.headers,
    });
  }

 
}
