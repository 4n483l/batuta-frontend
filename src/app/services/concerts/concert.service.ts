import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ROUTES } from 'src/app/config/api-routes';
import { Concert } from 'src/app/models/concert.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ConcertService {
  private concertsUrl = API_ROUTES.concerts;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken() || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getConcerts(): Observable<Concert[]> {
    return this.http.get<Concert[]>(this.concertsUrl);
  }

  getConcertById(id: number): Observable<Concert> {
    return this.http.get<Concert>(`${this.concertsUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  createConcert(concert: Concert): Observable<Concert> {
    return this.http.post<Concert>(this.concertsUrl, concert, {
      headers: this.getHeaders(),
    });
  }

  updateConcert(concert: Concert): Observable<Concert> {
    return this.http.put<Concert>(
      `${this.concertsUrl}/${concert.id}`,
      concert,
      {
        headers: this.getHeaders(),
      }
    );
  }

  deleteConcert(id: number): Observable<void> {
    return this.http.delete<void>(`${this.concertsUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
