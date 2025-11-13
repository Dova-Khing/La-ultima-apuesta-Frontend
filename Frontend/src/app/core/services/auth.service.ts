import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.api';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.api;
  constructor(private http: HttpClient) { }

  login(credentials: { nombre_usuario: string; contrasena: string }): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/auth/login`,
      credentials
    );
  }

  register(userData: {
    nombre: string;
    nombre_usuario: string;
    email: string;
    contrasena: string;
    telefono?: string;
    edad: string;
    saldo_inicial: number;
  }): Observable<any> {
    return this.http.post<any>(
      `${this.baseUrl}/auth/registro`,
      userData
    );
  }


  storeTokens(usuario: any): void {

    localStorage.setItem('usuario', JSON.stringify(usuario));


  }

  getToken(): string | null {

    return localStorage.getItem('usuario');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    // Limpiar toda la información de autenticación
    localStorage.removeItem('usuario');
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }

  // Método adicional para obtener el usuario actual
  getCurrentUser(): any {
    const usuario = localStorage.getItem('usuario');
    return usuario ? JSON.parse(usuario) : null;
  }
}
