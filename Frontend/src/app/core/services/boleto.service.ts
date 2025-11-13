/**
 * Service para manejar las operaciones CRUD de la entidad Boleto.
 */

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
    Boleto,
    BoletoCreate,
    BoletoUpdate
} from 'src/app/shared/models/boleto.model';

@Injectable({
    providedIn: 'root'
})
export class BoletoService {

    private apiUrl = 'http://localhost:8000/boletos'; // URL base de tu API de FastAPI

    constructor(private http: HttpClient) { }

    /**
     * Obtener todos los boletos.
     * El backend devuelve un array directo, no un objeto.
     */
    getBoletos(): Observable<Boleto[]> {
        return this.http.get<Boleto[]>(this.apiUrl);
    }

    /** Obtener un boleto por ID (string UUID) */
    getBoleto(id: string): Observable<Boleto> {
        return this.http.get<Boleto>(`${this.apiUrl}/${id}`);
    }

    /**
     * Crear un nuevo boleto.
     */
    createBoleto(data: BoletoCreate): Observable<Boleto> {
        return this.http.post<Boleto>(this.apiUrl, data);
    }

    /** Actualizar un boleto existente por ID */
    updateBoleto(id: string, data: BoletoUpdate): Observable<Boleto> {
        return this.http.put<Boleto>(`${this.apiUrl}/${id}`, data);
    }

    /** Eliminar un boleto por su ID */
    deleteBoleto(id: string): Observable<any> {
        return this.http.delete(`${this.apiUrl}/${id}`);
    }
}
