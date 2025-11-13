/**
 * Servicio encargado de gestionar todas las operaciones relacionadas con los premios.
 * Provee métodos para consultar listas paginadas con filtros, recuperar información
 * específica de un premio, así como crear, actualizar y eliminar registros.
 *
 * <p>Este servicio actúa como capa de comunicación entre los componentes del frontend
 * y los endpoints del backend asociados al recurso "premios".</p>
 *
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Premio, PremioFilters } from '../../shared/models/premio.model';
import { PaginationParams } from '../models/api-response.model';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class PremioService {
    /**
     * Endpoint base utilizado para acceder a los recursos de premios.
     */
    private readonly endpoint = '/premios';

    /**
     * Constructor del servicio.
     *
     * @param apiService Servicio centralizado responsable de gestionar todas las
     *                   solicitudes HTTP al backend.
     */
    constructor(private apiService: ApiService) { }
    /**
     * Obtiene una lista paginada de premios, permitiendo aplicar filtros opcionales
     * basados en las propiedades definidas en {@link PremioFilters}.
     *
     * <p>Este método genera los parámetros necesarios para realizar una consulta
     * eficiente y controlada según los criterios de paginación proporcionados.</p>
     *
     * @param pagination Parámetros de paginación que controlan el número de página y la cantidad de elementos por página.
     * @param filters (Opcional) Filtros adicionales para limitar los resultados.
     * @return Observable que emite un arreglo de objetos {@link Premio}.
     */

    getPremios(pagination: PaginationParams, filters?: PremioFilters): Observable<Premio[]> {
        return this.apiService.getPaginated<Premio>(this.endpoint, pagination, filters);
    }
    /**
  * Recupera un premio específico mediante su identificador único.
  *
  * @param id Identificador del premio a consultar.
  * @return Observable que emite un objeto {@link Premio} correspondiente al registro solicitado.
  */

    getPremioById(id: string): Observable<Premio> {
        return this.apiService.get<Premio>(`${this.endpoint}/${id}`);
    }
    /**
    * Crea un nuevo registro de premio en el sistema.
    *
    * @param premio Objeto parcial de {@link Premio} que contiene la información
    *               necesaria para registrar un nuevo premio.
    * @return Observable que emite el premio creado.
    */

    createPremio(premio: Partial<Premio>): Observable<Premio> {
        return this.apiService.post<Premio>(this.endpoint, premio);
    }
    /**
    * Actualiza la información de un premio existente.
    *
    * @param id Identificador del premio que se desea actualizar.
    * @param premio Objeto parcial de {@link Premio} con los datos modificados.
    * @return Observable que emite el premio actualizado.
    */

    updatePremio(id: string, premio: Partial<Premio>): Observable<Premio> {
        return this.apiService.put<Premio>(`${this.endpoint}/${id}`, premio);
    }
    /**
     * Elimina un premio del sistema mediante su identificador único.
     *
     * @param id Identificador del premio a eliminar.
     * @return Observable que emite el resultado de la operación de eliminación.
     */

    deletePremio(id: string): Observable<any> {
        return this.apiService.delete<any>(`${this.endpoint}/${id}`);
    }
}
