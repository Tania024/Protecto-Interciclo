import { Routes } from '@angular/router';

import { CarritoComponent } from './components/carrito/carrito.component';
import { CategoriaComponent } from './components/categoria/categoria.component';
import { InicioComponent } from './components/inicio/inicio.component';

import { IniciarSesionComponent } from './login/iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './login/registrarse/registrarse.component';

export const routes: Routes = [
    {path: 'carritocompras', title: 'CarritoCompras', component: CarritoComponent},
    {path: 'categoria', title: 'Categoria', component: CategoriaComponent},
    {path: 'inicio', title: 'Inicio', component: InicioComponent},
    {path: 'iniciarsesion', title: 'IniciarSesion', component: IniciarSesionComponent},
    {path: 'registrarse', title: 'Registrarse', component: RegistrarseComponent},
    
];