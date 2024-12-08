import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ROUTES } from 'src/app/config/api-routes';
import { Course } from 'src/app/models/course.model';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private coursesUrl = API_ROUTES.courses;
  private token: string = '';
  headers: HttpHeaders;

  constructor(private http: HttpClient, private authService: AuthService) {
    this.token = this.authService.getToken() || '';
    this.headers = new HttpHeaders({
      Authorization: `Bearer ${this.token}`,
    });
  }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.coursesUrl, {
      headers: this.headers,
    });
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.coursesUrl}/${id}`, {
      headers: this.headers,
    });
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.coursesUrl, course, {
      headers: this.headers,
    });
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.coursesUrl}/${course.id}`, course, {
      headers: this.headers,
    });
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.coursesUrl}/${id}`, {
      headers: this.headers,
    });
  }
}
