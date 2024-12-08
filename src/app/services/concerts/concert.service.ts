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

  private token?: string = '';
  headers: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = this.authService.getToken() || '';
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  }

  getConcerts(): Observable<Concert[]> {
    return this.http.get<Concert[]>(this.concertsUrl);
  }

  getConcertById(id: number): Observable<Concert> {
    return this.http.get<Concert>(`${this.concertsUrl}/${id}`, {
      headers: this.headers,
    });
  }

  createConcert(concert: Concert): Observable<Concert> {
    return this.http.post<Concert>(this.concertsUrl, concert, {
      headers: this.headers,
    });
  }

  updateConcert(concert: Concert): Observable<Concert> {
    return this.http.put<Concert>(
      `${this.concertsUrl}/${concert.id}`,
      concert,
      {
        headers: this.headers,
      }
    );
  }

  deleteConcert(id: number): Observable<void> {
    return this.http.delete<void>(`${this.concertsUrl}/${id}`, {
      headers: this.headers,
    });
  }
}
