/**
 * Servicio encargado de gestionar las operaciones relacionadas con los juegos.
 * Proporciona métodos para obtener listados paginados y filtrados, recuperar
 * información individual de un juego, crear nuevos registros, actualizarlos
 * y eliminarlos.
 *
 * <p>Este servicio funciona como capa de comunicación entre el frontend y
 * el backend en lo referente al módulo de juegos. Centraliza las peticiones
 * HTTP hacia los endpoints específicos del recurso "juegos".</p>
 *
 * <p>Nota: La barra final en el endpoint se utiliza para evitar respuestas
 * de redirección 307 en FastAPI.</p>
 *
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Juego, JuegoFilters } from '../../shared/models/juego.model';
import { PaginationParams } from '../models/api-response.model';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class JuegoService {

    /**
     * Endpoint base para operaciones relacionadas con juegos.
     * Incluye una barra diagonal final para evitar redirecciones 307
     * en el backend implementado en FastAPI.
     */
    private readonly endpoint = '/juegos/';
    /**
     * Constructor del servicio.
     *
     * @param apiService Servicio centralizado para interactuar con la API del backend.
     */

    constructor(private apiService: ApiService) { }
    /**
        * Obtiene una lista de juegos utilizando paginación y filtros opcionales.
        *
        * <p>El método permite enviar parámetros de consulta dinámicos para
        * limitar, ordenar o filtrar los resultados devueltos por el servidor.</p>
        *
        * @param pagination Parámetros de paginación que incluyen número de página y tamaño de página.
        * @param filters (Opcional) Filtros adicionales basados en las propiedades de {@link JuegoFilters}.
        * @return Observable que emite un arreglo de objetos {@link Juego}.
        */

    getJuegos(pagination: PaginationParams, filters?: JuegoFilters): Observable<Juego[]> {
        return this.apiService.getPaginated<Juego>(this.endpoint, pagination, filters);
    }

    /**
     * Obtiene los detalles de un juego específico utilizando su identificador único.
     *
     * @param id Identificador del juego a consultar.
     * @return Observable que emite un objeto {@link Juego} con la información recuperada.
     */

    getJuegoById(id: string): Observable<Juego> {
        return this.apiService.get<Juego>(`${this.endpoint}${id}`);
    }
    /**
   * Crea un nuevo registro de juego en el sistema.
   *
   * @param juego Objeto parcial de {@link Juego} que contiene los datos a registrar.
   * @return Observable que emite el juego creado.
   */

    createJuego(juego: Partial<Juego>): Observable<Juego> {
        return this.apiService.post<Juego>(this.endpoint, juego);
    }
    /**
 * Actualiza los datos de un juego existente.
 *
 * @param id Identificador del juego a actualizar.
 * @param juego Datos actualizados como objeto parcial de {@link Juego}.
 * @return Observable que emite el juego actualizado.
 */

    updateJuego(id: string, juego: Partial<Juego>): Observable<Juego> {
        return this.apiService.put<Juego>(`${this.endpoint}${id}`, juego);
    }
    /**
     * Elimina un juego de la base de datos del sistema.
     *
     * @param id Identificador único del juego a eliminar.
     * @return Observable que emite el resultado de la operación de eliminación.
     */

    //  Eliminar un juego
    deleteJuego(id: string): Observable<any> {
        return this.apiService.delete<any>(`${this.endpoint}${id}`);
    }
}
