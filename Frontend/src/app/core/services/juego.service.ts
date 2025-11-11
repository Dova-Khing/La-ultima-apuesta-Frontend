import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Juego, JuegoFilters } from '../../shared/models/juego.model';
import { PaginationParams } from '../models/api-response.model';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class JuegoService {
    //  Usa la barra final para evitar redirect 307 en FastAPI
    private readonly endpoint = '/juegos/';

    constructor(private apiService: ApiService) { }

    // Obtener lista de juegos (paginada y filtrada)
    getJuegos(pagination: PaginationParams, filters?: JuegoFilters): Observable<Juego[]> {
        return this.apiService.getPaginated<Juego>(this.endpoint, pagination, filters);
    }

    //  Obtener un juego por su ID
    getJuegoById(id: string): Observable<Juego> {
        return this.apiService.get<Juego>(`${this.endpoint}${id}`);
    }

    // Crear un nuevo juego
    createJuego(juego: Partial<Juego>): Observable<Juego> {
        return this.apiService.post<Juego>(this.endpoint, juego);
    }

    //  Actualizar un juego existente
    updateJuego(id: string, juego: Partial<Juego>): Observable<Juego> {
        return this.apiService.put<Juego>(`${this.endpoint}${id}`, juego);
    }

    //  Eliminar un juego
    deleteJuego(id: string): Observable<any> {
        return this.apiService.delete<any>(`${this.endpoint}${id}`);
    }
}
