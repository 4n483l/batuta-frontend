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

  private token?: string = '';
  headers: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = this.authService.getToken() || '';
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  }

  getRehearsals(): Observable<any> {
    return this.http.get(this.rehearsalsUrl, {
      headers: this.headers,
    });
  }

  getRehearsalById(id: number): Observable<any> {
    return this.http.get(`${this.rehearsalsUrl}/${id}`, {
      headers: this.headers,
    });
  }

  createRehearsal(rehearsal: Rehearsal): Observable<any> {
    return this.http.post(this.rehearsalsUrl, rehearsal, {
      headers: this.headers,
    });
  }

  updateRehearsal(rehearsal: Rehearsal): Observable<any> {
    return this.http.put(`${this.rehearsalsUrl}/${rehearsal.id}`, rehearsal, {
      headers: this.headers,
    });
  }

  deleteRehearsal(id: number): Observable<any> {
    return this.http.delete(`${this.rehearsalsUrl}/${id}`, {
      headers: this.headers,
    });
  }
}
