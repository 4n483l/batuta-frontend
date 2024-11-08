import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Concert } from 'src/app/models/concert.model';

@Injectable({
  providedIn: 'root',
})
export class ConcertService {
  private apiUrl = 'http://localhost:8000/api/concerts';

  constructor(private http: HttpClient) {}

  getConcerts(): Observable<Concert> {
    return this.http.get<Concert>(this.apiUrl);
  }
}
