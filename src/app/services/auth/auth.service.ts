import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private API_URL = 'http://127.0.0.1:8000/api'; // URL del backend Laravel

  // El estado de si el usuario está logueado. emisor de eventos
  private loggedIn = new BehaviorSubject<boolean>(this.isAuthenticated());

  // Observable para suscribirse a los cambios en el estado de autenticación
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  // Método para el login
  login(email: string, password: string): Observable<any> {
    const url = `${this.API_URL}/login`; // Ruta de login en Laravel
    return this.http.post(url, { email, password }).pipe(
      map((response: any) => {
        // Almacenar el token JWT en localStorage
        if (response.token) {
          localStorage.setItem('jwtToken', response.token);
          this.loggedIn.next(true); // Emitir el evento de que el usuario está logueado
        }
        return response;
      })
    );
  }

  // Método para el registro

  register(data: {
    name: string;
    surname: string;
    dni: string;
    phone: string;
    address: string;
    city: string;
    postalCode: string;
    birthdate: string;
    email: string;
    password: string;
    confirmPassword: string;
  }): Observable<any> {
    const url = `${this.API_URL}/register`; // Ruta de registro en Laravel

    return this.http.post(url, data);
  }

  // Método para obtener los datos del usuario autenticado
  /*   getUser(): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.API_URL}/user`, { headers });
  } */

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
    this.loggedIn.next(false); // Emitir el evento de que el usuario no está logueado
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
