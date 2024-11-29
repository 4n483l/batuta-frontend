import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { Instrument } from 'src/app/models/instrument.model';
import { API_ROUTES } from 'src/app/config/api-routes';

@Injectable({
  providedIn: 'root',
})
export class InstrumentService {
  private instrumentsUrl = API_ROUTES.instruments;

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

  getInstrumentById(id: number): Observable<Instrument> {
    return this.http.get<Instrument>(`${this.instrumentsUrl}/${id}`, {
      headers: this.headers,
    });
  }

  createInstrument(instrument: Instrument): Observable<Instrument> {
    return this.http.post<Instrument>(this.instrumentsUrl, instrument, {
      headers: this.headers,
    });
  }

  updateInstrument(instrument: Instrument): Observable<Instrument> {
    return this.http.put<Instrument>(
      `${this.instrumentsUrl}/${instrument.id}`,
      instrument,
      {
        headers: this.headers,
      }
    );
  }

  deleteInstrument(id: number): Observable<Instrument> {
    return this.http.delete<Instrument>(`${this.instrumentsUrl}/${id}`, {
      headers: this.headers,
    });
  }
}
