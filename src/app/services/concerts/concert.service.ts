import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ROUTES } from 'src/app/config/api-routes';
import { Concert } from 'src/app/models/concert.model';

@Injectable({
  providedIn: 'root',
})
export class ConcertService {
  // private concertsUrl = API_ROUTES.concerts;
  private concertsUrl = 'http://localhost:8000/api/concerts';

  constructor(private http: HttpClient) {}

  getConcerts(): Observable<Concert[]> {
    return this.http.get<Concert[]>(this.concertsUrl);
  }

  createConcert(concert: Concert): Observable<Concert> {
    return this.http.post<Concert>(this.concertsUrl, concert);
  }

  updateConcert(concert: Concert): Observable<Concert> {
    return this.http.put<Concert>(`${this.concertsUrl}/${concert.id}`, concert);
  }

  deleteConcert(id: number): Observable<void> {
    return this.http.delete<void>(`${this.concertsUrl}/${id}`);
  }
}
