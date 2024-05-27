import { Routes } from '@angular/router';
import { IniciarSesionComponent } from './login/iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './login/registrarse/registrarse.component';

export const routes: Routes = [
  {path: 'Inicio', title: 'Inicio', component:IniciarSesionComponent},
  {path: 'Registrarse', title: 'Registrarse', component:RegistrarseComponent},
];
