import { Component } from '@angular/core';
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
 // isLoading: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadUserType();
  }

  loadUserType(): void {
    this.authService.isLoggedIn$.subscribe((loggedIn) => {
      this.isLoggedIn = loggedIn;

      if (this.isLoggedIn) {

        this.authService.getUserData().subscribe((userData) => {
          this.userType = userData.user_type;
          this.loadUserStudentData();
        });
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
  }
}
