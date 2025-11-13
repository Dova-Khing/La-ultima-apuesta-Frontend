// src/app/core/services/api.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment.api';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    /**
     * URL base configurada para la API del entorno actual.
     */

    private readonly baseUrl = environment.api;

    /**
    * Constructor del servicio.
    *
    * @param http Cliente HTTP de Angular utilizado para ejecutar las peticiones.
    */

    constructor(private http: HttpClient) { }

    /**
     * Ejecuta una solicitud HTTP GET hacia un endpoint específico.
     *
     * @typeParam T Tipo de dato esperado como respuesta.
     * @param endpoint Ruta del endpoint relativa a la URL base.
     * @return Observable que emite el objeto de tipo T retornado por el servidor.
     */

    get<T>(endpoint: string): Observable<T> {
        return this.http.get<T>(`${this.baseUrl}${endpoint}`);
    }

    /**
     * Ejecuta una solicitud HTTP GET con soporte de paginación y filtros dinámicos.
     *
     * <p>Se generarán parámetros de consulta (query params) que incluyen:
     * <ul>
     *   <li><b>page</b>: Número de página (por defecto 1).</li>
     *   <li><b>page_size</b>: Cantidad de elementos por página (por defecto 10).</li>
     *   <li>Filtros adicionales según el objeto recibido.</li>
     * </ul>
     * </p>
     *
     * @typeParam T Tipo de dato esperado como respuesta.
     * @param endpoint Ruta del endpoint relativa a la URL base.
     * @param pagination Objeto que contiene la información de paginación.
     * @param filters Objeto opcional con filtros adicionales para la consulta.
     * @return Observable que emite un arreglo de elementos de tipo T.
     */

    getPaginated<T>(endpoint: string, pagination: any, filters?: any): Observable<T[]> {
        let params = new HttpParams()
            .set('page', pagination?.page ?? 1)                  // usa 1 si no hay page
            .set('page_size', pagination?.pageSize ?? 10);       // usa 10 si no hay pageSize

        if (filters) {
            Object.keys(filters).forEach(key => {
                if (filters[key] !== undefined && filters[key] !== '') {
                    params = params.set(key, filters[key]);
                }
            });
        }

        return this.http.get<T[]>(`${this.baseUrl}${endpoint}`, { params });
    }



    /**
     * Ejecuta una solicitud HTTP POST para enviar datos al servidor.
     *
     * @typeParam T Tipo de dato esperado como respuesta.
     * @param endpoint Ruta del endpoint relativa a la URL base.
     * @param body Datos que se enviarán en el cuerpo de la solicitud.
     * @return Observable que emite el resultado de la operación.
     */
    post<T>(endpoint: string, body: any): Observable<T> {
        return this.http.post<T>(`${this.baseUrl}${endpoint}`, body);
    }

    /**
     * Ejecuta una solicitud HTTP PUT para actualizar datos en el servidor.
     *
     * @typeParam T Tipo de dato esperado como respuesta.
     * @param endpoint Ruta del endpoint relativa a la URL base.
     * @param body Datos actualizados que se enviarán en la solicitud.
     * @return Observable que emite el resultado de la operación.
     */

    put<T>(endpoint: string, body: any): Observable<T> {
        return this.http.put<T>(`${this.baseUrl}${endpoint}`, body);
    }

    /**
     * Ejecuta una solicitud HTTP DELETE para eliminar un recurso en el servidor.
     *
     * @typeParam T Tipo de dato esperado como respuesta.
     * @param endpoint Ruta del endpoint relativa a la URL base.
     * @return Observable que emite el resultado de la operación de eliminación.
     */

    delete<T>(endpoint: string): Observable<T> {
        return this.http.delete<T>(`${this.baseUrl}${endpoint}`);
    }
}
