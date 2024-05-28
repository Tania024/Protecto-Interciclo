import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AutenticacionService } from '../../services/autenticacion.service';
import { UserCredential } from 'firebase/auth';

@Component({
  selector: 'app-registrarse',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './registrarse.component.html',
  styleUrl: './registrarse.component.scss'
})
export class RegistrarseComponent {
  registerForm: FormGroup;
  errorMessage: string | null = null;

  constructor(
    private fb: FormBuilder,
    private authService: AutenticacionService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      nombre: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      usuario: ['', Validators.required],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      tipoUsuario: ['cliente', Validators.required] 
    });
  }

  onRegister() {
    if (this.registerForm.valid) {
      const { nombre, email, usuario, contrasena, tipoUsuario } = this.registerForm.value;
      this.authService.register(nombre, email, usuario, contrasena, tipoUsuario).subscribe({
        next: (userCredential: UserCredential | null) => {
          if (userCredential) {
            this.router.navigate(['/dashboard']); 
          } else {
            this.errorMessage = 'No se pudo completar el registro';
          }
        },
        error: (error: any) => { 
          this.errorMessage = `Error: ${error.message}`;
        }
      });
    } else {
      this.errorMessage = 'Por favor, completa todos los campos';
    }
  }
}
