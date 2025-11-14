import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup, AbstractControl } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="register-page">
      <h2>Crear Cuenta</h2>

      <form [formGroup]="form" (ngSubmit)="submit()">
        <div>
          <label for="nombre">Nombre Completo:</label>
          <input type="text" id="nombre" formControlName="nombre" />
          <div *ngIf="form.get('nombre')?.touched && form.get('nombre')?.invalid" class="error-text">
            El nombre es obligatorio y debe tener al menos 2 caracteres.
          </div>
        </div>

        <div>
          <label for="nombre_usuario">Nombre de Usuario:</label>
          <input type="text" id="nombre_usuario" formControlName="nombre_usuario" />
          <div *ngIf="form.get('nombre_usuario')?.touched && form.get('nombre_usuario')?.invalid" class="error-text">
            El nombre de usuario es obligatorio y debe tener al menos 3 caracteres.
          </div>
        </div>

        <div>
          <label for="email">Correo Electrónico:</label>
          <input type="email" id="email" formControlName="email" />
          <div *ngIf="form.get('email')?.touched && form.get('email')?.invalid" class="error-text">
            Ingresa un correo válido.
          </div>
        </div>

        <div>
          <label for="edad">Edad:</label>
          <input type="number" id="edad" formControlName="edad" min="18" max="100" />
          <div *ngIf="form.get('edad')?.touched && form.get('edad')?.invalid" class="error-text">
            La edad es obligatoria y debe ser entre 18 y 100 años.
          </div>
        </div>

        <div>
          <label for="telefono">Teléfono (Opcional):</label>
          <input type="tel" id="telefono" formControlName="telefono" />
        </div>

        <div>
          <label for="saldo_inicial">Saldo Inicial:</label>
          <input type="number" id="saldo_inicial" formControlName="saldo_inicial" min="0" step="0.01" />
          <div *ngIf="form.get('saldo_inicial')?.touched && form.get('saldo_inicial')?.invalid" class="error-text">
            El saldo inicial no puede ser negativo.
          </div>
        </div>

        <div>
          <label for="contrasena">Contraseña:</label>
          <input type="password" id="contrasena" formControlName="contrasena" />
          <div *ngIf="form.get('contrasena')?.touched && form.get('contrasena')?.invalid" class="error-text">
            La contraseña es obligatoria y debe tener al menos 8 caracteres.
          </div>
        </div>

        <div>
          <label for="confirmar_contrasena">Confirmar Contraseña:</label>
          <input type="password" id="confirmar_contrasena" formControlName="confirmar_contrasena" />
          <div *ngIf="form.get('confirmar_contrasena')?.touched && form.hasError('passwordsMismatch')" class="error-text">
            Las contraseñas no coinciden.
          </div>
        </div>

        <button type="submit" [disabled]="form.invalid || isLoading">
          {{ isLoading ? 'Registrando...' : 'Registrarse' }}
        </button>

        <!-- Mostrar mensajes de error/success -->
        <div *ngIf="errorMessage" class="error-text" style="text-align: center; margin-top: 1rem;">
          {{ errorMessage }}
        </div>

        <div *ngIf="successMessage" class="success-text" style="text-align: center; margin-top: 1rem; color: green;">
          {{ successMessage }}
        </div>

        <div class="login-link">
          <p>¿Ya tienes una cuenta? <a (click)="goToLogin()">Inicia Sesión</a></p>
        </div>
      </form>
    </div>
  `,
  styles: [`
    .register-page {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background: linear-gradient(135deg, #e9f0ff, #ffffff);
      font-family: 'Segoe UI', Roboto, sans-serif;
      padding: 2rem 0;
    }

    form {
      background: #fff;
      padding: 2rem 3rem;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      width: 100%;
      max-width: 450px;
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
      background: #28a745;
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
      background-color: #218838;
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

    .login-link {
      text-align: center;
      margin-top: 1.5rem;
      padding-top: 1rem;
      border-top: 1px solid #eee;
    }

    .login-link p {
      margin: 0;
      color: #666;
    }

    .login-link a {
      color: #007bff;
      text-decoration: none;
      cursor: pointer;
      font-weight: 500;
    }

    .login-link a:hover {
      text-decoration: underline;
    }

    .success-text {
      color: #28a745;
      font-size: 0.9rem;
      text-align: center;
    }
  `]
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  isLoading = false;
  errorMessage = '';
  successMessage = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      nombre_usuario: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      edad: ['', [Validators.required, Validators.min(18), Validators.max(100)]],
      telefono: [''],
      saldo_inicial: [0, [Validators.min(0)]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      confirmar_contrasena: ['', [Validators.required]]
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('contrasena');
    const confirmPassword = control.get('confirmar_contrasena');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword.setErrors({ passwordsMismatch: true });
      return { passwordsMismatch: true };
    }
    return null;
  }

  submit(): void {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const payload = { ...this.form.value };

    delete payload.confirmar_contrasena;


    if (payload.edad) {
      payload.edad = payload.edad.toString();
    }

    console.log('Payload registro:', payload);

    this.auth.register(payload).subscribe({
      next: (response) => {
        console.log('Registro exitoso:', response);
        this.isLoading = false;
        this.successMessage = '¡Registro exitoso! Ahora puedes iniciar sesión.';


        setTimeout(() => {
          this.router.navigate(['/auth/login']);
        }, 2000);
      },
      error: (err) => {
        console.error('Error en registro:', err);
        this.isLoading = false;


        if (err.status === 400) {
          this.errorMessage = err.error?.detail || 'Datos inválidos. Verifica la información.';
        } else if (err.status === 409) {
          this.errorMessage = 'El usuario o email ya existe.';
        } else if (err.status === 0) {
          this.errorMessage = 'No se pudo conectar al servidor. Verifica tu conexión.';
        } else {
          this.errorMessage = err.error?.detail || err.error?.message || 'Error en el registro. Intenta nuevamente.';
        }
      }
    });
  }

  goToLogin(): void {
    this.router.navigate(['/auth/login']);
  }
}
