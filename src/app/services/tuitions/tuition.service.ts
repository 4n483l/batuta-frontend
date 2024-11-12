import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Tuition } from 'src/app/models/tuition.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TuitionService {
  private tuitionsUrl = 'http://localhost:8000/api/tuitions';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getTuitions(): Observable<Tuition[]> {
    // Obtener el token de autenticación
    const token = this.authService.getToken();
    // Crear los headers con el token de autenticación
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });

    return this.http.get<Tuition[]>(this.tuitionsUrl, { headers });
  }
}
