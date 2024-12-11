import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ROUTES } from 'src/app/config/api-routes';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private teachersUrl = API_ROUTES.teachers;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken() || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getTeachers(): Observable<any> {
   return this.http.get(`${this.teachersUrl}`, {
     headers: this.getHeaders(),
   });
  }
}
