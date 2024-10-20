import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ConcertsComponent } from './components/concerts/concerts.component';

const routes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'register', component: RegisterComponent }, // Ruta explícita para el registro (opcional)
  { path: 'login', component: LoginComponent }, // Ruta explícita para el login (opcional)
  // Aquí puedes agregar más rutas según sea necesario, por ejemplo:
  { path: 'dashboard', component: DashboardComponent },
  { path: 'concerts', component: ConcertsComponent },
  { path: '**', redirectTo: '' }, // Redirigir a la página de login si no se encuentra la ruta
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
