import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ROUTES } from 'src/app/config/api-routes';
import { Rehearsal } from 'src/app/models/rehearsal.model';

@Injectable({
  providedIn: 'root',
})
export class RehearsalService {
  private rehearsalsUrl = API_ROUTES.rehearsals;
  // private rehearsalsUrl = 'http://localhost:8000/api/rehearsals';

  constructor(private http: HttpClient) {}

  getRehearsals(): Observable<Rehearsal[]> {
    return this.http.get<Rehearsal[]>(this.rehearsalsUrl);
  }

  getRehearsalById(id: number): Observable<Rehearsal> {
    return this.http.get<Rehearsal>(`${this.rehearsalsUrl}/${id}`);
  }

  createRehearsal(rehearsal: Rehearsal): Observable<Rehearsal> {
    return this.http.post<Rehearsal>(this.rehearsalsUrl, rehearsal);
  }

  updateRehearsal(rehearsal: Rehearsal): Observable<Rehearsal> {
    return this.http.put<Rehearsal>(
      `${this.rehearsalsUrl}/${rehearsal.id}`,
      rehearsal
    );
  }

  deleteRehearsal(id: number): Observable<void> {
    return this.http.delete<void>(`${this.rehearsalsUrl}/${id}`);
  }
}
