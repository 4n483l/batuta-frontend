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

  constructor(private http: HttpClient, private authService: AuthService) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken() || '';
    return new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
  }

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.coursesUrl, {
      headers: this.getHeaders(),
    });
  }

  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.coursesUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }

  createCourse(course: Course): Observable<Course> {
    return this.http.post<Course>(this.coursesUrl, course, {
      headers: this.getHeaders(),
    });
  }

  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.coursesUrl}/${course.id}`, course, {
      headers: this.getHeaders(),
    });
  }

  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.coursesUrl}/${id}`, {
      headers: this.getHeaders(),
    });
  }





}
