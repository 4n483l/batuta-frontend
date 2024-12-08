import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from 'src/app/models/course.model';


@Injectable({
  providedIn: 'root',
})
export class EventService {


  constructor(private http: HttpClient) {}


}
