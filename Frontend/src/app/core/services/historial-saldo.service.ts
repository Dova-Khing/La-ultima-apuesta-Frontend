import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HistorialSaldo, HistorialSaldoFilters } from '../../shared/models/historial-saldo.model';
import { PaginationParams } from '../models/api-response.model';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class HistorialSaldoService {
    private readonly endpoint = '/historial-saldo';

    constructor(private apiService: ApiService) { }

    getHistorial(pagination: PaginationParams, filters?: HistorialSaldoFilters): Observable<HistorialSaldo[]> {
        return this.apiService.getPaginated<HistorialSaldo>(this.endpoint, pagination, filters);
    }

    getById(id: string): Observable<HistorialSaldo> {
        return this.apiService.get<HistorialSaldo>(`${this.endpoint}/${id}`);
    }

    create(data: Partial<HistorialSaldo>): Observable<HistorialSaldo> {
        return this.apiService.post<HistorialSaldo>(this.endpoint, data);
    }

    update(id: string, data: Partial<HistorialSaldo>): Observable<HistorialSaldo> {
        return this.apiService.put<HistorialSaldo>(`${this.endpoint}/${id}`, data);
    }

    delete(id: string): Observable<any> {
        return this.apiService.delete<any>(`${this.endpoint}/${id}`);
    }
}
