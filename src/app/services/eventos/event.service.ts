import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course.model';


@Injectable({
  providedIn: 'root',
})
export class EventService {
  // private concertsUrl = 'http://localhost:8000/api/concerts';
  // private rehearsalsUrl = 'http://localhost:8000/api/rehearsals';
 // private examsUrl = 'http://localhost:8000/api/exams';
 // private coursesUrl = 'http://localhost:8000/api/courses';

  constructor(private http: HttpClient) {}

  /* getConcerts(): Observable<Concert[]> {
    return this.http.get<Concert[]>(this.concertsUrl);
  }
 */
/*   getRehearsals(): Observable<Rehearsal[]> {
    return this.http.get<Rehearsal[]>(this.rehearsalsUrl);
  }
 */
 /*  getExams(): Observable<Exam[]> {
    return this.http.get<Exam[]>(this.examsUrl);
  } */

/*   getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.coursesUrl);
  } */
}
