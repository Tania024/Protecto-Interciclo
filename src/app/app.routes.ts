import { Routes } from '@angular/router';
import { IniciarSesionComponent } from './login/iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './login/registrarse/registrarse.component';

import { InicioComponent } from './components/inicio/inicio.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { CarritoComponent } from './components/carrito/carrito.component';
export const routes: Routes = [
    {path: 'iniciarsesion', title: 'IniciarSesion', component: IniciarSesionComponent},
    {path: 'registrarse', title: 'Registrarse', component: RegistrarseComponent},
    {path: 'inicio', title: 'Inicio', component: InicioComponent},
    {path: 'categoria', title: 'Categoria', component: CategoriaComponent},
    {path: 'carrito', title: 'Carrito', component: CarritoComponent},
   
];


