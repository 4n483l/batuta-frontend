import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'http://127.0.0.1:8000'; // URL del backend Laravel

  constructor(private http: HttpClient) {}

  // Método para el login
  login(email: string, password: string): Observable<any> {
    const url = `${this.API_URL}/login`; // Ruta de login en Laravel
    return this.http.post(url, { email, password }).pipe(
      map((response: any) => {
        // Almacenar el token JWT en localStorage
        if (response.token) {
          localStorage.setItem('jwtToken', response.token);
        }
        return response;
      })
    );
  }

  // Método para el registro
  register(name: string, email: string, password: string): Observable<any> {
    const url = `${this.API_URL}/register`; // Ruta de registro en Laravel
    return this.http.post(url, { name, email, password });
  }

  // Método para obtener el token almacenado
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  // Método para cerrar sesión
  logout(): void {
    localStorage.removeItem('jwtToken');
  }

  // Método para hacer una llamada autenticada con JWT
  getAuthenticatedData(endpoint: string): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.API_URL}/${endpoint}`, { headers });
  }
}
