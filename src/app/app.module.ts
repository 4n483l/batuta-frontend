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
