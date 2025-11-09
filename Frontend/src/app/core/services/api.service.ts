// src/app/core/services/api.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.api';

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    private readonly baseUrl = environment.api;

    constructor(private http: HttpClient) { }

    get<T>(endpoint: string): Observable<T> {
        return this.http.get<T>(`${this.baseUrl}${endpoint}`);
    }

    getPaginated<T>(endpoint: string, pagination: any, filters?: any): Observable<T[]> {
        let params = new HttpParams()
            .set('page', pagination?.page ?? 1)                  // usa 1 si no hay page
            .set('page_size', pagination?.pageSize ?? 10);       // usa 10 si no hay pageSize

        if (filters) {
            Object.keys(filters).forEach(key => {
                if (filters[key] !== undefined && filters[key] !== '') {
                    params = params.set(key, filters[key]);
                }
            });
        }

        return this.http.get<T[]>(`${this.baseUrl}${endpoint}`, { params });
    }

    post<T>(endpoint: string, body: any): Observable<T> {
        return this.http.post<T>(`${this.baseUrl}${endpoint}`, body);
    }

    put<T>(endpoint: string, body: any): Observable<T> {
        return this.http.put<T>(`${this.baseUrl}${endpoint}`, body);
    }

    delete<T>(endpoint: string): Observable<T> {
        return this.http.delete<T>(`${this.baseUrl}${endpoint}`);
    }
}
