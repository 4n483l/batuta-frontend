import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { API_ROUTES } from 'src/app/config/api-routes';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authUrl = API_ROUTES.auth;
  // El estado de si el usuario está logueado. emisor de eventos
  private loggedIn = new BehaviorSubject<boolean>(this.isAuthenticated());
  // Observable para suscribirse a los cambios en el estado de autenticación
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  login(email: string, password: string): Observable<any> {
    const url = `${this.authUrl}/login`; // Ruta de login en Laravel
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
    const url = `${this.authUrl}/register`;

    return this.http.post(url, data);
  }

  getUsers(): Observable<any> {
    return this.http.get(`${this.authUrl}/users`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    });
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.authUrl}/users/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    });
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.authUrl}/users`, user, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    });
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.authUrl}/users/${id}`, user, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.authUrl}/users/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    });
  }


  

  // Método para obtener el token almacenado
  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }

  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }

  getUserData(): Observable<any> {
    return this.http.get(`${this.authUrl}/user`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    });
  }

  getUserStudents(): Observable<any> {
    return this.http.get(`${this.authUrl}/user/students`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    });
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
    return this.http.get(`${this.authUrl}/${endpoint}`, { headers });
  }
}
