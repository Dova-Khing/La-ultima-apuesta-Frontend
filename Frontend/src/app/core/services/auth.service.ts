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

  storeTokens(tokens: { accessToken: string; refreshToken: string }): void {
    localStorage.setItem('accessToken', tokens.accessToken);
    localStorage.setItem('refreshToken', tokens.refreshToken);
  }

  getToken(): string | null {
    return localStorage.getItem('accessToken');
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout(): void {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
