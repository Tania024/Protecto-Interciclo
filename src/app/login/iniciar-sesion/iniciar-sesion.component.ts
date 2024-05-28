import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserCredential } from '@angular/fire/auth';
import { AutenticacionService } from '../../services/autenticacion.service';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-iniciar-sesion',
    standalone: true,
    imports: [ ReactiveFormsModule, CommonModule],
    templateUrl: './iniciar-sesion.component.html',
    styleUrl: './iniciar-sesion.component.scss'
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
      email: ['', [Validators.required, Validators.email]],
      contrasena: ['', Validators.required]
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, contrasena } = this.loginForm.value;
      this.authService.login(email, contrasena).subscribe({
        next: (userCredential: UserCredential | null) => {
          if (userCredential) {
            this.router.navigate(['/dashboard']); 
          } else {
            this.errorMessage = 'Usuario o contraseña incorrectos';
          }
        },
        error: (error) => {
          this.errorMessage = `Error: ${error.message}`;
        }
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos';
    }
  }
}
