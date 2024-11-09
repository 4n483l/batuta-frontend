import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Concert } from 'src/app/models/concert.model';

@Injectable({
  providedIn: 'root',
})
export class ConcertService {
  private apiUrl = 'http://127.0.0.1:8000/api/concerts'; // Cambia esta URL a la de tu backend

  constructor(private http: HttpClient) {}

  // Método para obtener la lista de conciertos desde el backend
  getConcerts(): Observable<Concert[]> {
    return this.http.get<Concert[]>(this.apiUrl);
  }
}
