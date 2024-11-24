import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ROUTES } from 'src/app/config/api-routes';
import { Exam } from 'src/app/models/exam.model';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  private examsUrl = API_ROUTES.exams;

  constructor(private http: HttpClient) {}

  getExams(): Observable<Exam[]> {
    return this.http.get<Exam[]>(this.examsUrl);
  }
}
