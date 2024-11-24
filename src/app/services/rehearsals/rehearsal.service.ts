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

  constructor(private http: HttpClient) {}

  getRehearsals(): Observable<Rehearsal[]> {
    return this.http.get<Rehearsal[]>(this.rehearsalsUrl);
  }
}
