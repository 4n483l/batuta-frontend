import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tuition } from 'src/app/models/tuition.model';
import { AuthService } from '../auth/auth.service';
import { API_ROUTES } from 'src/app/config/api-routes';

@Injectable({
  providedIn: 'root',
})
export class TuitionService {
  private tuitionsUrl = API_ROUTES.tuitions;
   //private tuitionsUrl = 'http://localhost:8000/api/tuitions';

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

  getTuitions(): Observable<Tuition[]> {
    return this.http.get<Tuition[]>(this.tuitionsUrl, {
      headers: this.headers,
    });
  }

  postTuition(tuition: Tuition): Observable<Tuition> {
    return this.http.post<Tuition>(this.tuitionsUrl, tuition, {
      headers: this.headers,
    });
  }
}
