import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://localhost:8000';

  constructor(private http: HttpClient, private router: Router) { }

  login(credentials: { nombre_usuario: string; contrasena: string }): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/auth/login`, credentials).pipe(
      tap(response => {
        console.log('Respuesta del login:', response);

        this.storeToken('token_temporal_' + Date.now());
      })
    );
  }

  register(userData: any): Observable<any> {

    return this.http.post<any>(`${this.apiUrl}/auth/registro`, userData);
  }

  storeToken(token: string): void {
    localStorage.setItem('access_token', token);
    console.log('Token almacenado:', token);
  }

  getToken(): string | null {
    return localStorage.getItem('access_token');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('access_token');
    this.router.navigate(['/auth/login']);
  }

  // Método adicional para obtener el usuario actual
  getCurrentUser(): any {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }
}
