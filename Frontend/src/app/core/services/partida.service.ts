/**
 * Servicio encargado de gestionar las operaciones relacionadas con las partidas.
 * Proporciona métodos para la consulta paginada y filtrada de partidas, así como
 * para la obtención, creación, actualización y eliminación de registros
 * individuales de partidas.
 *
 * <p>Este servicio actúa como intermediario entre los componentes del frontend y
 * los endpoints del backend asociados al recurso "partidas".</p>
 *
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Partida, PartidaFilters } from 'src/app/shared/models/partida.model';
import { PaginationParams } from '../models/api-response.model';
import { ApiService } from './api.service'; // Asegúrate que la ruta sea correcta

@Injectable({
    providedIn: 'root'
})
export class PartidaService {
    /**
   * Endpoint base para las operaciones relacionadas con partidas.
   */
    private readonly endpoint = '/partidas';
    /**
   * Constructor del servicio.
   *
   * @param apiService Servicio centralizado encargado de manejar las solicitudes HTTP al backend.
   */

    constructor(private apiService: ApiService) { }
    /**
    * Obtiene una lista paginada de partidas, permitiendo aplicar filtros opcionales
    * relacionados con los campos definidos en {@link PartidaFilters}.
    *
    * <p>Los parámetros de paginación controlan el número de elementos por página
    * y el índice de página actual.</p>
    *
    * @param pagination Parámetros de paginación, incluyendo página actual y tamaño de página.
    * @param filters (Opcional) Filtros adicionales basados en las propiedades de {@link PartidaFilters}.
    * @return Observable que emite un arreglo de objetos {@link Partida}.
    */

    getPartidas(pagination: PaginationParams, filters?: PartidaFilters): Observable<Partida[]> {
        return this.apiService.getPaginated<Partida>(this.endpoint, pagination, filters);
    }
    /**
    * Obtiene los detalles de una partida específica mediante su identificador único.
    *
    * @param id Identificador único de la partida a consultar.
    * @return Observable que emite un objeto {@link Partida}.
    */

    getPartidaById(id: string): Observable<Partida> {
        return this.apiService.get<Partida>(`${this.endpoint}/${id}`);
    }
    /**
    * Crea un nuevo registro de partida en el sistema.
    *
    * @param partida Objeto parcial de {@link Partida} que contiene los datos
    *                necesarios para la creación de un nuevo registro.
    * @return Observable que emite el objeto de partida creado.
    */

    createPartida(partida: Partial<Partida>): Observable<Partida> {
        return this.apiService.post<Partida>(this.endpoint, partida);
    }
    /**
     * Actualiza los datos de una partida existente.
     *
     * @param id Identificador de la partida a actualizar.
     * @param partida Objeto parcial de {@link Partida} con las propiedades modificadas.
     * @return Observable que emite la partida actualizada.
     */

    updatePartida(id: string, partida: Partial<Partida>): Observable<Partida> {
        return this.apiService.put<Partida>(`${this.endpoint}/${id}`, partida);
    }
    /**
    * Elimina una partida del sistema mediante su identificador.
    *
    * @param id Identificador único de la partida a eliminar.
    * @return Observable que emite el resultado de la operación de eliminación.
    */

    deletePartida(id: string): Observable<any> {
        return this.apiService.delete<any>(`${this.endpoint}/${id}`);
    }
}
