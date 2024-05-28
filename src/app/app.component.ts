import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { IniciarSesionComponent } from './login/iniciar-sesion/iniciar-sesion.component';
import { RegistrarseComponent } from './login/registrarse/registrarse.component';

import { InicioComponent } from './components/inicio/inicio.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,InicioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'proyectointerciclo';
}
