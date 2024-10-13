import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  { path: '', component: LoginComponent }, // Ruta por defecto que carga el componente de login
  { path: 'login', component: LoginComponent }, // Ruta explícita para el login (opcional)
  // Aquí puedes agregar más rutas según sea necesario, por ejemplo:
  // { path: 'dashboard', component: DashboardComponent }
  { path: '**', redirectTo: '' }, // Redirigir a la página de login si no se encuentra la ruta
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
