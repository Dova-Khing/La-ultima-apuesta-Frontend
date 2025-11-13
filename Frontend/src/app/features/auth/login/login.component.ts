import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="login-page">
      <h2>Iniciar Sesión</h2>

      <!-- Mostrar mensaje si ya está logueado -->
      <div *ngIf="isLoggedIn" class="logged-in-message">
        <p> Ya estás logueado en el sistema.</p>
        <div class="button-group">
          <button (click)="goToDashboard()" class="btn-primary">Ir al Dashboard</button>
          <button (click)="logout()" class="btn-secondary">Cerrar Sesión</button>
        </div>
      </div>

      <!-- Formulario de login (solo mostrar si NO está logueado) -->
      <form *ngIf="!isLoggedIn" [formGroup]="form" (ngSubmit)="submit()">
        <div>
          <label for="nombre_usuario">Usuario o Email:</label>
          <input type="text" id="nombre_usuario" formControlName="nombre_usuario" />
          <div *ngIf="form.get('nombre_usuario')?.touched && form.get('nombre_usuario')?.invalid" class="error-text">
            El usuario o email es obligatorio.
          </div>
        </div>

        <div>
          <label for="contrasena">Contraseña:</label>
          <input type="password" id="contrasena" formControlName="contrasena" />
          <div *ngIf="form.get('contrasena')?.touched && form.get('contrasena')?.invalid" class="error-text">
            La contraseña es obligatoria y debe tener al menos 8 caracteres.
          </div>
        </div>

        <button type="submit" [disabled]="form.invalid">Ingresar</button>
      </form>
    </div>
  `,
  styles: [`
    .login-page {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
      background: linear-gradient(135deg, #e9f0ff, #ffffff);
      font-family: 'Segoe UI', Roboto, sans-serif;
    }

    form, .logged-in-message {
      background: #fff;
      padding: 2rem 3rem;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 400px;
    }

    h2 {
      margin-bottom: 1.5rem;
      color: #1e2a38;
      font-weight: 600;
      text-align: center;
    }

    label {
      display: block;
      text-align: left;
      margin-bottom: 0.5rem;
      color: #333;
      font-weight: 500;
    }

    input {
      width: 100%;
      padding: 0.7rem 1rem;
      border: 1px solid #ccc;
      border-radius: 8px;
      font-size: 0.95rem;
      transition: border-color 0.3s ease, box-shadow 0.3s ease;
    }

    input:focus {
      border-color: #007bff;
      outline: none;
      box-shadow: 0 0 4px rgba(0, 123, 255, 0.3);
    }

    button {
      width: 100%;
      border: none;
      padding: 0.8rem;
      border-radius: 8px;
      font-size: 1rem;
      cursor: pointer;
      font-weight: 500;
      margin-top: 1rem;
      transition: background-color 0.3s ease, transform 0.2s ease;
    }

    .btn-primary {
      background: #007bff;
      color: white;
    }

    .btn-primary:hover:not(:disabled) {
      background-color: #0056b3;
      transform: translateY(-1px);
    }

    .btn-secondary {
      background: #6c757d;
      color: white;
    }

    .btn-secondary:hover:not(:disabled) {
      background: #545b62;
      transform: translateY(-1px);
    }

    button:disabled {
      background: #a6c8ff;
      cursor: not-allowed;
      transform: none;
    }

    div {
      margin-bottom: 1.2rem;
    }

    .error-text {
      color: #c82333;
      font-size: 0.85rem;
      text-align: left;
      margin-top: 0.25rem;
    }

    .logged-in-message {
      text-align: center;
    }

    .logged-in-message p {
      margin-bottom: 1.5rem;
      color: #28a745;
      font-weight: 500;
      font-size: 1.1rem;
    }

    .button-group {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }
  `]
})
export class LoginComponent implements OnInit {
  form!: FormGroup;
  isLoggedIn = false;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre_usuario: ['', [Validators.required, Validators.minLength(3)]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
    });

    // Verificar si ya está logueado pero NO redirigir automáticamente
    this.isLoggedIn = this.auth.isLoggedIn();
  }

  submit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.value;
    console.log('Payload enviado:', payload);

    this.auth.login(payload).subscribe({
      next: (response) => {
        console.log('Login exitoso:', response);
        this.auth.storeTokens(response);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error completo en login:', err);
        const msg = err.error?.detail || err.error?.message || 'Error en login';
        alert(`Error: ${msg} (Status: ${err.status})`);
      }
    });
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  logout(): void {
    this.auth.logout();
    this.isLoggedIn = false;
    // Recargar para limpiar completamente el estado
    setTimeout(() => {
      window.location.reload();
    }, 100);
  }
}
