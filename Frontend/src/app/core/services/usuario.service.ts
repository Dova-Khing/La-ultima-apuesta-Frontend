/**
 * Servicio encargado de gestionar las operaciones relacionadas con los usuarios.
 * Proporciona métodos para obtener listados paginados y filtrados, recuperar
 * un usuario por su identificador, crear, actualizar y eliminar usuarios.
 *
 * <p>Actúa como capa intermedia entre los componentes del frontend y los
 * endpoints del backend asociados al recurso "usuarios". Centraliza las
 * llamadas HTTP para mantener el código más limpio y consistente.</p>
 *
 */
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario, CreateUsuarioRequest, UpdateUsuarioRequest, UsuarioFilters } from '../../shared/models/usuario.model';
import { PaginationParams } from '../models/api-response.model';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root'
})
export class UsuarioService {
    /**
    * Endpoint base para las operaciones relacionadas con usuarios.
    * Corresponde al recurso expuesto por el backend en /usuarios.
    */
    private readonly endpoint = '/usuarios';

    constructor(private apiService: ApiService) { }
    /**
     * Obtiene una lista paginada de usuarios.
     *
     * @param pagination Parámetros de paginación (page, limit, ordenar, etc.)
     * @param filters Opcional: filtros para búsqueda avanzada (nombre, correo, rol, estado, etc.)
     * @returns Observable con un arreglo de objetos Usuario.
     */

    // CRUD Operations
    getUsuarios(pagination: PaginationParams, filters?: UsuarioFilters): Observable<Usuario[]> {
        return this.apiService.getPaginated<Usuario>(this.endpoint, pagination, filters);
    }
    /**
    * Obtiene un usuario específico por su ID.
    *
    * @param id Identificador único del usuario.
    * @returns Observable con el objeto Usuario encontrado.
    */

    getUsuarioById(id: string): Observable<Usuario> {
        return this.apiService.get<Usuario>(`${this.endpoint}/${id}`);
    }
    /**
     * Crea un nuevo usuario en el sistema.
     *
     * @param usuario Datos del nuevo usuario (CreateUsuarioRequest).
     * @returns Observable con el usuario creado.
     */

    createUsuario(usuario: CreateUsuarioRequest): Observable<Usuario> {
        return this.apiService.post<Usuario>(this.endpoint, usuario);
    }
    /**
     * Actualiza los datos de un usuario existente.
     *
     * @param id Identificador del usuario que se desea actualizar.
     * @param usuario Datos actualizados (UpdateUsuarioRequest).
     * @returns Observable con el usuario actualizado.
     */

    updateUsuario(id: string, usuario: UpdateUsuarioRequest): Observable<Usuario> {
        return this.apiService.put<Usuario>(`${this.endpoint}/${id}`, usuario);
    }
    /**
     * Elimina un usuario del sistema.
     *
     * @param id Identificador del usuario a eliminar.
     * @returns Observable con la respuesta del backend.
     */

    deleteUsuario(id: string): Observable<any> {
        return this.apiService.delete<any>(`${this.endpoint}/${id}`);
    }
}
