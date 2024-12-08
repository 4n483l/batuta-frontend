import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ROUTES } from 'src/app/config/api-routes';
import { Rehearsal } from 'src/app/models/rehearsal.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class RehearsalService {
  private rehearsalsUrl = API_ROUTES.rehearsals;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken() || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getRehearsals(): Observable<any> {
    return this.http.get(this.rehearsalsUrl, {
      headers: this.getHeaders(),
    });
  }

  getRehearsalById(id: number): Observable<any> {
    return this.http.get(`${this.rehearsalsUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  createRehearsal(rehearsal: Rehearsal): Observable<any> {
    return this.http.post(this.rehearsalsUrl, rehearsal, {
      headers: this.getHeaders(),
    });
  }

  updateRehearsal(rehearsal: Rehearsal): Observable<any> {
    return this.http.put(`${this.rehearsalsUrl}/${rehearsal.id}`, rehearsal, {
      headers: this.getHeaders(),
    });
  }

  deleteRehearsal(id: number): Observable<any> {
    return this.http.delete(`${this.rehearsalsUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
