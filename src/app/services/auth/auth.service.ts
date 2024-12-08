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
  private usersUrl = API_ROUTES.users;
  private studentsUrl = API_ROUTES.students;
  
  // El estado de si el usuario está logueado. emisor de eventos
  private loggedIn = new BehaviorSubject<boolean>(this.isAuthenticated());
  isLoggedIn$ = this.loggedIn.asObservable();

  constructor(private http: HttpClient) {}

  /* *****  AUTENTICACION  ***** */

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

  logout(): void {
    localStorage.removeItem('jwtToken');
    this.loggedIn.next(false); // Emitir el evento de que el usuario no está logueado
  }

  getToken(): string | null {
    return localStorage.getItem('jwtToken');
  }
  // Método para verificar si el usuario está autenticado
  isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
  // metodo para obtener datos autenticados
  getAuthenticatedData(endpoint: string): Observable<any> {
    const token = this.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.authUrl}/${endpoint}`, { headers });
  }

  /* *****  USUARIOS  ***** */

  getUsers(): Observable<any> {
    return this.http.get(`${this.usersUrl}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    });
  }

  getUserById(id: number): Observable<any> {
    return this.http.get(`${this.usersUrl}/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    });
  }

  createUser(user: any): Observable<any> {
    return this.http.post(`${this.usersUrl}`, user, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    });
  }

  updateUser(id: number, user: any): Observable<any> {
    return this.http.put(`${this.usersUrl}/${id}`, user, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    });
  }

  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.usersUrl}/${id}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    });
  }

  getUserData(): Observable<any> {
    return this.http.get(`${this.usersUrl}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    });
  }

  /* *****  ESTUDIANTES  ***** */

  getStudents(): Observable<any> {
    return this.http.get(`${this.studentsUrl}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    });
  }
  getStudentById(studentId: string): Observable<any> {
    return this.http.get(`${this.studentsUrl}/${studentId}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    });
  }

  createStudent(student: any): Observable<any> {
    return this.http.post(`${this.studentsUrl}`, student, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    });
  }

  updateStudent(studentId: string, student: any): Observable<any> {
    return this.http.put(`${this.studentsUrl}/${studentId}`, student, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    });
  }

  deleteStudent(studentId: number): Observable<any> {
    return this.http.delete(`${this.studentsUrl}/${studentId}`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    });
  }


  // Método para obtener los estudiantes de un usuario
  getUserStudents(): Observable<any> {
    return this.http.get(`${this.authUrl}/user/students`, {
      headers: new HttpHeaders({
        Authorization: `Bearer ${this.getToken()}`,
      }),
    });
  }
}
