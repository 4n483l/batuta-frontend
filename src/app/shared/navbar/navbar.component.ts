import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { th, tr } from 'date-fns/locale';
import { AuthService } from 'src/app/services/auth/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent {
  isLoggedIn: boolean = false;
  userType: string = '';
  hasStudents: boolean = false;
  role: string = '';
  // isLoading: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loadUserType();
  }

  loadUserType(): void {
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;

      if (this.isLoggedIn) {
        this.authService.getUserData().subscribe((userData) => {
          this.userType = userData.user_type;
          this.role = userData.role;
          this.loadUserStudentData();
        });
      } else {
        this.userType = '';
        this.role = '';
        this.hasStudents = false;
      }
    });
  }

  loadUserStudentData(): void {
    this.authService.getUserStudents().subscribe((students) => {
      if (students.length > 0) {
        this.hasStudents = true;
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.isLoggedIn = false;
    this.userType = '';
    this.role = '';
    this.hasStudents = false;
    this.router.navigate(['/login']);
  }
}
