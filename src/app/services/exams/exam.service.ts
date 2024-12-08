import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ROUTES } from 'src/app/config/api-routes';
import { Exam } from 'src/app/models/exam.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  private examsUrl = API_ROUTES.exams;

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken() || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getExams(): Observable<Exam[]> {
    return this.http.get<Exam[]>(this.examsUrl, {
      headers: this.getHeaders(),
    });
  }

  getExamById(id: number): Observable<Exam> {
    return this.http.get<Exam>(`${this.examsUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  createExam(exam: Exam): Observable<Exam> {
    return this.http.post<Exam>(this.examsUrl, exam, {
      headers: this.getHeaders(),
    });
  }

  updateExam(exam: Exam): Observable<Exam> {
    return this.http.put<Exam>(`${this.examsUrl}/${exam.id}`, exam, {
      headers: this.getHeaders(),
    });
  }

  deleteExam(id: number): Observable<void> {
    return this.http.delete<void>(`${this.examsUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }
}
