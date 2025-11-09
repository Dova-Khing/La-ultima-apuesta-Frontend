// src/app/core/services/partida.service.ts

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Partida, PartidaFilters } from 'src/app/shared/models/partida.model';
import { PaginationParams } from '../models/api-response.model';
import { ApiService } from './api.service'; // Asegúrate que la ruta sea correcta

@Injectable({
    providedIn: 'root'
})
export class PartidaService {
    private readonly endpoint = '/partidas';

    constructor(private apiService: ApiService) { }

    getPartidas(pagination: PaginationParams, filters?: PartidaFilters): Observable<Partida[]> {
        return this.apiService.getPaginated<Partida>(this.endpoint, pagination, filters);
    }

    getPartidaById(id: string): Observable<Partida> {
        return this.apiService.get<Partida>(`${this.endpoint}/${id}`);
    }

    createPartida(partida: Partial<Partida>): Observable<Partida> {
        return this.apiService.post<Partida>(this.endpoint, partida);
    }

    updatePartida(id: string, partida: Partial<Partida>): Observable<Partida> {
        return this.apiService.put<Partida>(`${this.endpoint}/${id}`, partida);
    }

    deletePartida(id: string): Observable<any> {
        return this.apiService.delete<any>(`${this.endpoint}/${id}`);
    }
}
