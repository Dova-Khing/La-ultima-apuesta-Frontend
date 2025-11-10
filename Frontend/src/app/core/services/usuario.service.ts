// src/app/core/services/usuario.service.ts
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario, CreateUsuarioRequest, UpdateUsuarioRequest, UsuarioFilters } from '../../shared/models/usuario.model';
import { PaginationParams } from '../models/api-response.model';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    private readonly endpoint = '/usuarios';

    constructor(private apiService: ApiService) { }

    // CRUD Operations
    getUsuarios(pagination: PaginationParams, filters?: UsuarioFilters): Observable<Usuario[]> {
        return this.apiService.getPaginated<Usuario>(this.endpoint, pagination, filters);
    }

    getUsuarioById(id: string): Observable<Usuario> {
        return this.apiService.get<Usuario>(`${this.endpoint}/${id}`);
    }

    createUsuario(usuario: CreateUsuarioRequest): Observable<Usuario> {
        return this.apiService.post<Usuario>(this.endpoint, usuario);
    }

    updateUsuario(id: string, usuario: UpdateUsuarioRequest): Observable<Usuario> {
        return this.apiService.put<Usuario>(`${this.endpoint}/${id}`, usuario);
    }

    deleteUsuario(id: string): Observable<any> {
        return this.apiService.delete<any>(`${this.endpoint}/${id}`);
    }
}
