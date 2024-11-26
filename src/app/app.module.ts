import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { LoginComponent } from './auth/login/login.component';
import { FormsModule } from '@angular/forms';

import { RegisterComponent } from './auth/register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { ConcertsComponent } from './components/concerts/concerts.component';
import { CalendarComponent } from './shared/calendar/calendar.component';
import { RehearsalsComponent } from './components/rehearsals/rehearsals.component';
import { ExamsComponent } from './components/exams/exams.component';
import { CoursesComponent } from './components/courses/courses.component';
import { TuitionsComponent } from './components/tuitions/tuitions.component';
import { NoteEditorComponent } from './components/note-editor/note-editor.component';
import { AdminComponent } from './components/admin/admin.component';
import { ConcertsFormComponent } from './components/admin/concerts/concerts-form.component';
import { ConcertsListComponent } from './components/admin/concerts/concerts-list.component';
import { RehearsalsFormComponent } from './components/admin/rehearsals/rehearsals-form.component';
import { RehearsalsListComponent } from './components/admin/rehearsals/rehearsals-list.component';
import { ConcertAdminComponent } from './components/admin/concerts/concert-admin/concert-admin.component';



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
    NoteEditorComponent,
    AdminComponent,
    ConcertsFormComponent,
    ConcertsListComponent,
    RehearsalsListComponent,
    RehearsalsFormComponent,
    ConcertAdminComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory,
    }),
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
