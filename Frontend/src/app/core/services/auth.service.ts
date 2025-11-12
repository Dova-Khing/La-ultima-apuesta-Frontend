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

  login(credentials: { username: string; email: string }): Observable<{ accessToken: string; refreshToken: string }> {
    return this.http.post<{ accessToken: string; refreshToken: string }>(`${this.baseUrl}/auth/login`, credentials);
  }
  storeTokens(tokens: { accessToken: string; refreshToken: string }): void { }
}
