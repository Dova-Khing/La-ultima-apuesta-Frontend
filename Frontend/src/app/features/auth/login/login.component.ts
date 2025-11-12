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

      <form [formGroup]="form" (ngSubmit)="submit()">
        <div>
          <label for="username">Usuario:</label>
          <input type="text" id="username" formControlName="username" />
          <div *ngIf="form.get('username')?.touched && form.get('username')?.invalid" class="error-text">
            El usuario es obligatorio y debe tener al menos 10 caracteres.
          </div>
        </div>

        <div>
          <label for="email">Correo Electrónico:</label>
          <input type="email" id="email" formControlName="email" />
          <div *ngIf="form.get('email')?.touched && form.get('email')?.invalid" class="error-text">
            Ingresa un correo válido.
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

  form {
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
    background: #007bff;
    color: white;
    border: none;
    padding: 0.8rem;
    border-radius: 8px;
    font-size: 1rem;
    cursor: pointer;
    font-weight: 500;
    margin-top: 1rem;
    transition: background-color 0.3s ease, transform 0.2s ease;
  }

  button:hover:not(:disabled) {
    background-color: #0056b3;
    transform: translateY(-1px);
  }

  button:disabled {
    background: #a6c8ff;
    cursor: not-allowed;
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
`]
})
export class LoginComponent implements OnInit {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
    });

    const token = localStorage.getItem('accessToken');
    if (token) {
      this.router.navigate(['/dashboard']);
    }
  }

  submit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.form.value;

    this.auth.login(payload).subscribe({
      next: (tokens) => {
        this.auth.storeTokens(tokens);
        this.router.navigate(['/dashboard']);
      },
      error: (err) => {
        console.error('Error en login', err);
        alert('Error en login');
      }
    });
  }
}