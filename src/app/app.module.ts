import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CalendarComponent } from './shared/calendar/calendar.component';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ConcertsComponent } from './components/concerts/concerts.component';
import { RehearsalsComponent } from './components/rehearsals/rehearsals.component';
import { ExamsComponent } from './components/exams/exams.component';
import { CoursesComponent } from './components/courses/courses.component';
import { TuitionsComponent } from './components/tuitions/tuitions.component';
import { AdminComponent } from './components/admin/admin.component';
import { ConcertsFormComponent } from './components/admin/concerts/concerts-form.component';
import { ConcertAdminComponent } from './components/admin/concerts/concert-admin.component';
import { RehearsalsFormComponent } from './components/admin/rehearsals/rehearsals-form.component';

import { NotesComponent } from './components/notes/notes.component';
import { NoteFormComponent } from './components/note-form/note-form.component';
import { RehearsalAdminComponent } from './components/admin/rehearsals/rehearsal-admin.component';
import { SubjectAdminComponent } from './components/admin/subjects/subject-admin.component';
import { SubjectFormComponent } from './components/admin/subjects/subject-form.component';
import { InstrumentFormComponent } from './components/admin/instruments/instrument-form.component';
import { InstrumentAdminComponent } from './components/admin/instruments/instrument-admin.component';
import { UserAdminComponent } from './components/admin/users/user-admin.component';
import { UserFormComponent } from './components/admin/users/user-form.component';
import { CourseAdminComponent } from './components/admin/courses/course-admin.component';
import { CourseFormComponent } from './components/admin/courses/course-form.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ConcertsComponent,
    CalendarComponent,
    RehearsalsComponent,
    ExamsComponent,
    CoursesComponent,
    TuitionsComponent,
    AdminComponent,
    ConcertsFormComponent,
    RehearsalsFormComponent,
    ConcertAdminComponent,
    NotesComponent,
    NoteFormComponent,
    RehearsalAdminComponent,
    SubjectAdminComponent,
    SubjectFormComponent,
    InstrumentFormComponent,
    InstrumentAdminComponent,
    UserAdminComponent,
    UserFormComponent,
    CourseAdminComponent,
    CourseFormComponent,
  ],
  imports: [BrowserModule, FormsModule, AppRoutingModule, HttpClientModule],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
