import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { Instrument } from 'src/app/models/instrument.model';

@Injectable({
  providedIn: 'root',
})
export class InstrumentService {
  private instrumentsUrl = 'http://localhost:8000/api/subjects/instruments';
  //'http://panel.batuta.lo/api/subjects';

  private token?: string = '';
  headers: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService) {
    // Obtener el token de autenticación
    this.token = this.authService.getToken() || '';
    // Crear los headers con el token de autenticación
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  }

  getInstruments(): Observable<Instrument[]> {
    return this.http.get<Instrument[]>(this.instrumentsUrl, {
      headers: this.headers,
    });
  }
}
