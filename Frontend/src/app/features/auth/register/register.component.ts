import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    standalone: true,
    selector: 'app-register',
    imports: [CommonModule],
    template: `
    <div class="register-page">
      <h2>Registro</h2>
      <p>Formulario de registro aquí...</p>
    </div>
  `,
    styles: [`
    .register-page {
      padding: 2rem;
      text-align: center;
    }
  `]
})
export class RegisterComponent { }
