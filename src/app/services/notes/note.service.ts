import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private apiUrl = 'http://localhost/api/notes';

  constructor(private http: HttpClient) { }

  createNote(note: any) : Observable<any> {
    return this.http.post(this.apiUrl, note,{
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }


  saveAsPdf(note: any) : Observable<any> {
    return this.http.post(`${this.apiUrl}/generate-pdf`, note);
  }

}
