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
import { NoteEditorComponent } from './components/note-editor/note-editor.component';
import { MatriculaComponent } from './components/matricula/matricula.component';

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
  { path: 'edit-notes', component: NoteEditorComponent },
  { path: 'matricula', component: MatriculaComponent },

  { path: '**', redirectTo: '' }, // Redirigir a la página de login si no se encuentra la ruta
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
