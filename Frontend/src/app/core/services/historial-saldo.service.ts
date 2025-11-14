/**
 * Servicio encargado de gestionar las operaciones relacionadas con el historial de saldo.
 * Proporciona métodos para obtener listas paginadas, recuperar registros individuales
 * por identificador, crear nuevos registros, actualizarlos y eliminarlos.
 *
 * <p>Este servicio actúa como capa intermedia entre los componentes del frontend y
 * la API del backend, encapsulando la lógica de consumo de endpoints específicos
 * del módulo de historial de saldo.</p>
 *
 */

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HistorialSaldo, HistorialSaldoFilters } from '../../shared/models/historial-saldo.model';
import { PaginationParams } from '../models/api-response.model';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class HistorialSaldoService {
    /**
   * Endpoint base para las operaciones relacionadas con historial de saldo.
   */
    private readonly endpoint = '/historial-saldo';
    /**
     * Constructor del servicio.
     *
     * @param apiService Servicio API centralizado utilizado para ejecutar las solicitudes HTTP.
     */

    constructor(private apiService: ApiService) { }
    /**
    * Obtiene una lista paginada de registros del historial de saldo.
    *
    * <p>Permite aplicar parámetros de paginación y filtros opcionales para
    * refinar los resultados.</p>
    *
    * @param pagination Parámetros de paginación que incluyen número de página y tamaño.
    * @param filters (Opcional) Filtros adicionales para la consulta.
    * @return Observable que emite un arreglo de objetos {@link HistorialSaldo}.
    */

    getHistorial(pagination: PaginationParams, filters?: HistorialSaldoFilters): Observable<HistorialSaldo[]> {
        return this.apiService.getPaginated<HistorialSaldo>(this.endpoint, pagination, filters);
    }
    /**
     * Recupera un registro específico del historial de saldo a partir de su identificador.
     *
     * @param id Identificador único del registro.
     * @return Observable que emite un objeto {@link HistorialSaldo}.
     */

    getById(id: string): Observable<HistorialSaldo> {
        return this.apiService.get<HistorialSaldo>(`${this.endpoint}/${id}`);
    }
    /**
     * Crea un nuevo registro en el historial de saldo.
     *
     * @param data Datos del registro a crear. Puede contener un subconjunto
     *             de las propiedades de {@link HistorialSaldo}.
     * @return Observable que emite el objeto creado.
     */

    create(data: Partial<HistorialSaldo>): Observable<HistorialSaldo> {
        return this.apiService.post<HistorialSaldo>(this.endpoint, data);
    }
    /**
     * Actualiza un registro existente del historial de saldo.
     *
     * @param id Identificador del registro a actualizar.
     * @param data Propiedades a actualizar del registro, como objeto parcial de {@link HistorialSaldo}.
     * @return Observable que emite el objeto actualizado.
     */

    update(id: string, data: Partial<HistorialSaldo>): Observable<HistorialSaldo> {
        return this.apiService.put<HistorialSaldo>(`${this.endpoint}/${id}`, data);
    }
    /**
  * Elimina un registro del historial de saldo.
  *
  * @param id Identificador único del registro a eliminar.
  * @return Observable que emite el resultado de la operación.
  */

    delete(id: string): Observable<any> {
        return this.apiService.delete<any>(`${this.endpoint}/${id}`);
    }
}
