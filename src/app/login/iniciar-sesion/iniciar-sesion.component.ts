import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserCredential } from '@angular/fire/auth';
import { AutenticacionService } from '../../services/autenticacion.service';

@Component({
    selector: 'app-iniciar-sesion',
    standalone: true,
    imports: [],
    templateUrl: './iniciar-sesion.component.html',
    styleUrls: ['./iniciar-sesion.component.scss']
})
export class IniciarSesionComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AutenticacionService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      usuario: ['', Validators.required],
      contrasena: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { usuario, contrasena } = this.loginForm.value;
      this.authService.login(usuario, contrasena).subscribe({
        next: (userCredential: UserCredential | null) => {
          if (userCredential) {
            this.router.navigate(['/dashboard']); // Cambiar '/dashboard' a la ruta de tu página principal después del login
          } else {
            this.errorMessage = 'Usuario o contraseña incorrectos';
          }
        },
        error: (error) => {
          this.errorMessage = error.message;
        }
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos';
    }
  }
}
