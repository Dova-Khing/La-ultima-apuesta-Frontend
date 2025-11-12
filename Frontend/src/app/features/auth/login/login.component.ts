import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [CommonModule],
  template: `
    <div class="login-page">
      <h2>Iniciar Sesión</h2>
      <p>Formulario de login aquí</p>
      <form formGroup="form" (ngSubmit)="submit()">
        <div>
          <label for="username">Usuario:</label>
          <input type="text" id="username" name="username" />
        </div>
        <div>
          <label for="email">Correo Electrónico:</label>
          <input type="email" id="email" name="email" />
        </div>
        <button type="submit">Ingresar</button>
      </form>
    </div>
  `,
  styles: [`
    .login-page {
      padding: 2rem;
      text-align: center;
    }
  `]
})
export class LoginComponent {

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router) { }
  form: any;

  ngOnInit(): void {
    this.form = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(10)]],
      email: ['', [Validators.required, Validators.email]],
    });

    const token = localStorage.getItem('accessToken');
    if (token) {
      this.router.navigate(['/dashboard']);
    }
  }

  submit() {

    if (this.form.valid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = {
      username: this.form.value.username,
      email: this.form.value.email
    };

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
