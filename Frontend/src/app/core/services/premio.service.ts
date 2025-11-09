import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Premio, PremioFilters } from '../../shared/models/premio.model';
import { PaginationParams } from '../models/api-response.model';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class PremioService {
    private readonly endpoint = '/premios';

    constructor(private apiService: ApiService) { }

    // Obtener lista paginada con filtros
    getPremios(pagination: PaginationParams, filters?: PremioFilters): Observable<Premio[]> {
        return this.apiService.getPaginated<Premio>(this.endpoint, pagination, filters);
    }

    getPremioById(id: string): Observable<Premio> {
        return this.apiService.get<Premio>(`${this.endpoint}/${id}`);
    }

    createPremio(premio: Partial<Premio>): Observable<Premio> {
        return this.apiService.post<Premio>(this.endpoint, premio);
    }

    updatePremio(id: string, premio: Partial<Premio>): Observable<Premio> {
        return this.apiService.put<Premio>(`${this.endpoint}/${id}`, premio);
    }

    deletePremio(id: string): Observable<any> {
        return this.apiService.delete<any>(`${this.endpoint}/${id}`);
    }
}
