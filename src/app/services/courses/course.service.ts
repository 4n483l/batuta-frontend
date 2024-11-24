import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { API_ROUTES } from 'src/app/config/api-routes';
import { Course } from 'src/app/models/course.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private coursesUrl = API_ROUTES.courses;

  constructor(private http: HttpClient) {}

  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.coursesUrl);
  }
}
