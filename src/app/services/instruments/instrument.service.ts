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

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken() || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getInstruments(): Observable<Instrument[]> {
    return this.http.get<Instrument[]>(this.instrumentsUrl, {
      headers: this.getHeaders(),
    });
  }

  getInstrumentById(id: number): Observable<Instrument> {
    return this.http.get<Instrument>(`${this.instrumentsUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  createInstrument(instrument: Instrument): Observable<Instrument> {
    return this.http.post<Instrument>(this.instrumentsUrl, instrument, {
      headers: this.getHeaders(),
    });
  }

  updateInstrument(instrument: Instrument): Observable<Instrument> {
    return this.http.put<Instrument>(
      `${this.instrumentsUrl}/${instrument.id}`,
      instrument,
      {
        headers: this.getHeaders(),
      }
    );
  }

  deleteInstrument(id: number): Observable<Instrument> {
    return this.http.delete<Instrument>(`${this.instrumentsUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
