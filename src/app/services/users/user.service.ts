import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_ROUTES } from 'src/app/config/api-routes';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userUrl = `${API_ROUTES.auth}/user`;

  constructor(
    private http: HttpClient,
     private authService: AuthService
    ) {}


  getUserType(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.userUrl, { headers });
  }


  getUserDetails(): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(this.userUrl, { headers });
  }
}
