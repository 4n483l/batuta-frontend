import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';
import { Subject } from 'src/app/models/subject.model';
import { API_ROUTES } from 'src/app/config/api-routes';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  private subjectsUrl = API_ROUTES.subjects;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken() || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getSubjects(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.subjectsUrl, {
      headers: this.getHeaders(),
    });
  }

  getSubjectById(id: number): Observable<Subject> {
    return this.http.get<Subject>(`${this.subjectsUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  createSubject(subject: Subject): Observable<Subject> {
    return this.http.post<Subject>(this.subjectsUrl, subject, {
      headers: this.getHeaders(),
    });
  }

  updateSubject(subject: Subject): Observable<Subject> {
    return this.http.put<Subject>(
      `${this.subjectsUrl}/${subject.id}`,
      subject,
      {
        headers: this.getHeaders(),
      }
    );
  }

  deleteSubject(id: number): Observable<void> {
    return this.http.delete<void>(`${this.subjectsUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
