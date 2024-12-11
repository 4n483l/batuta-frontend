import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ConcertsComponent } from './components/concerts/concerts.component';
import { RehearsalsComponent } from './components/rehearsals/rehearsals.component';
import { ExamsComponent } from './components/exams/exams.component';
import { CoursesComponent } from './components/courses/courses.component';
import { TuitionsComponent } from './components/tuitions/tuitions.component';

import { AdminComponent } from './components/admin/admin.component';
import { ConcertAdminComponent } from './components/admin/concerts/concert-admin.component';
import { NoteFormComponent } from './components/note-form/note-form.component';
import { ConcertsFormComponent } from './components/admin/concerts/concerts-form.component';
import { RehearsalAdminComponent } from './components/admin/rehearsals/rehearsal-admin.component';
import { RehearsalsFormComponent } from './components/admin/rehearsals/rehearsals-form.component';
import { SubjectAdminComponent } from './components/admin/subjects/subject-admin.component';
import { SubjectFormComponent } from './components/admin/subjects/subject-form.component';
import { InstrumentAdminComponent } from './components/admin/instruments/instrument-admin.component';
import { InstrumentFormComponent } from './components/admin/instruments/instrument-form.component';
import { CourseAdminComponent } from './components/admin/courses/course-admin.component';
import { CourseFormComponent } from './components/admin/courses/course-form.component';
import { NotesComponent } from './components/notes/notes.component';
import { UserAdminComponent } from './components/admin/users/user-admin.component';
import { UserFormComponent } from './components/admin/users/user-form.component';
import { StudentAdminComponent } from './components/admin/students/student-admin.component';
import { StudentFormComponent } from './components/admin/students/student-form.component';
import { ExamAdminComponent } from './components/admin/exams/exam-admin.component';
import { ExamFormComponent } from './components/admin/exams/exam-form.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'concerts', component: ConcertsComponent },
  { path: 'rehearsals', component: RehearsalsComponent },
  { path: 'exams', component: ExamsComponent },
  { path: 'courses', component: CoursesComponent },
  { path: 'tuitions', component: TuitionsComponent },

  { path: 'notes', component: NotesComponent},

  { path: 'note-form', component: NoteFormComponent },

  { path: 'note-form/:id', component: NoteFormComponent },

  
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      /* --------------USUARIOS ----------- */
      {
        path: 'user-admin',
        component: UserAdminComponent,
      },
      {
        path: 'user-form',
        component: UserFormComponent,
      },
      {
        path: 'user-form/:id',
        component: UserFormComponent,
      },
      /* --------------CONCIERTOS ----------- */
      {
        path: 'concert-admin',
        component: ConcertAdminComponent,
      },
      {
        path: 'concerts-form',
        component: ConcertsFormComponent,
      },
      {
        path: 'concerts-form/:id',
        component: ConcertsFormComponent,
      },
      /* --------------ENSAYOS ----------- */
      {
        path: 'rehearsal-admin',
        component: RehearsalAdminComponent,
      },
      {
        path: 'rehearsals-form',
        component: RehearsalsFormComponent,
      },
      {
        path: 'rehearsals-form/:id',
        component: RehearsalsFormComponent,
      },
      /* --------------ESTUDIANTES ----------- */
      {
        path: 'student-admin',
        component: StudentAdminComponent,
      },
      {
        path: 'student-form',
        component: StudentFormComponent,
      },
      {
        path: 'student-form/:id',
        component: StudentFormComponent,
      },
      /* --------------ASIGNATURAS ----------- */
      {
        path: 'subject-admin', // Rutas para administrar asignaturas
        component: SubjectAdminComponent,
      },
      {
        path: 'subject-form', // Agregar asignatura
        component: SubjectFormComponent,
      },
      {
        path: 'subject-form/:id', // Editar asignatura
        component: SubjectFormComponent,
      },
      /* --------------INSTRUMENTOS ----------- */
      {
        path: 'instrument-admin', // Rutas para administrar instrumentos
        component: InstrumentAdminComponent,
      },
      {
        path: 'instrument-form', // Agregar instrumento
        component: InstrumentFormComponent,
      },
      {
        path: 'instrument-form/:id', // Editar instrumento
        component: InstrumentFormComponent,
      },
      /* --------------CURSOS ----------- */
      {
        path: 'course-admin', // Rutas para administrar courseos
        component: CourseAdminComponent,
      },
      {
        path: 'course-form',
        component: CourseFormComponent,
      },
      {
        path: 'course-form/:id',
        component: CourseFormComponent,
      },
      /* --------------EXAMENES ----------- */
      {
        path: 'exam-admin', // Rutas para administrar examos
        component: ExamAdminComponent,
      },
      {
        path: 'exam-form',
        component: ExamFormComponent,
      },
      {
        path: 'exam-form/:id',
        component: ExamFormComponent,
      },
    ],
  },

  { path: '**', redirectTo: '' }, // Redirigir a la página de login si no se encuentra la ruta
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
