import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-login',
    imports: [CommonModule],
    template: `
    <div class="login-page">
      <h2>Iniciar Sesión</h2>
      <p>Formulario de login aquí...</p>
    </div>
  `,
    styles: [`
    .login-page {
      padding: 2rem;
      text-align: center;
    }
  `]
})
export class LoginComponent { }
