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

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken() || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getTuitions(): Observable<Tuition[]> {
    return this.http.get<Tuition[]>(this.tuitionsUrl, {
      headers: this.getHeaders(),
    });
  }

  postTuition(tuition: Tuition): Observable<Tuition> {
    return this.http.post<Tuition>(this.tuitionsUrl, tuition, {
      headers: this.getHeaders(),
    });
  }
}
