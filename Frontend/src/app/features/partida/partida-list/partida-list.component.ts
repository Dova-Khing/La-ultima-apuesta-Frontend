
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PartidaService } from '../../../core/services/partida.service';
import { Partida, PartidaFilters } from '../../../shared/models/partida.model';
import { PaginationParams } from '../../../core/models/api-response.model';

/**
 * Componente para la gestión y administración de partidas
 *
 * Este componente proporciona funcionalidad completa de CRUD para partidas:
 * - Listar partidas con paginación y filtros
 * - Crear nuevas partidas
 * - Editar partidas existentes
 * - Eliminar partidas
 * - Manejo de estados de partida (INICIO, etc.)
 *
 * @example
 * <app-partida-list></app-partida-list>
 */
@Component({
    selector: 'app-partida-list',
    standalone: true,
    templateUrl: './partida-list.component.html',
    imports: [CommonModule, FormsModule]
})
export class PartidaListComponent implements OnInit {

    /** Array que almacena la lista de partidas */
    partidas: Partida[] = [];

    /** Parámetros de paginación para la consulta de datos */
    pagination: PaginationParams = { page: 1, limit: 10 };

    /** Filtros aplicables a la lista de partidas */
    filters: PartidaFilters = {};

    /** Controla la visibilidad del modal de creación/edición */
    showModal = false;

    /** Objeto temporal para almacenar los datos de la partida en edición/creación */
    editingPartida: Partida = {
        id: undefined,
        usuario_id: '',
        juego_id: '',
        costo_apuesta: 0,
        estado: 'INICIO', // Estado inicial
        premio_id: undefined,
        fecha: ''
    } as Partida;

    /**
     * Constructor del componente
     * @param partidaService Servicio para operaciones CRUD de partidas
     */
    constructor(private partidaService: PartidaService) { }

    /**
     * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente
     * Carga la lista de partidas al iniciar
     */
    ngOnInit(): void {
        this.loadPartidas();
    }

    /**
     * Carga las partidas desde el servidor
     * Aplica los parámetros de paginación y filtros actuales
     */
    loadPartidas(): void {
        this.partidaService.getPartidas(this.pagination, this.filters)
            .subscribe((resp) => {
                this.partidas = resp;
            });
    }

    /**
     * Abre el modal para crear o editar una partida
     * @param partida Partida a editar (opcional, si no se proporciona se crea nueva)
     */
    openModal(partida?: Partida): void {
        this.editingPartida = partida
            ? { ...partida }
            : {
                id: undefined,
                usuario_id: '',
                juego_id: '',
                costo_apuesta: 0,
                estado: 'INICIO',
                premio_id: undefined,
                fecha: ''
            } as Partida;

        this.showModal = true;
    }

    /**
     * Guarda una partida (creación o edición)
     * Realiza limpieza de UUIDs para evitar errores de validación
     * Maneja tanto creación como actualización según la presencia de ID
     */
    savePartida(): void {
        const partidaToSave: Partial<Partida> = { ...this.editingPartida };

        //Limpiar todos los UUIDs de espacios/tabs para evitar el Error 422
        if (partidaToSave.usuario_id) {
            partidaToSave.usuario_id = partidaToSave.usuario_id.trim();
        }
        if (partidaToSave.juego_id) {
            partidaToSave.juego_id = partidaToSave.juego_id.trim();
        }
        if (partidaToSave.premio_id) {
            // Solo aplicar trim si no es undefined
            partidaToSave.premio_id = partidaToSave.premio_id.trim() || undefined;
        }

        if (partidaToSave.id) {
            // Actualizar
            this.partidaService.updatePartida(partidaToSave.id, partidaToSave)
                .subscribe(() => {
                    this.loadPartidas();
                    this.closeModal();
                });
        } else {
            // Crear
            this.partidaService.createPartida(partidaToSave)
                .subscribe(() => {
                    this.loadPartidas();
                    this.closeModal();
                });
        }
    }

    /**
     * Elimina una partida específica
     * @param id Identificador único de la partida a eliminar
     */
    deletePartida(id: string): void {
        this.partidaService.deletePartida(id)
            .subscribe(() => this.loadPartidas());
    }

    /**
     * Métodos auxiliares para la interfaz
     */

    /**
     * Cierra el modal de creación/edición
     */
    closeModal(): void {
        this.showModal = false;
    }

    /**
     * Inicia el proceso de creación de una nueva partida
     * Abre el modal de creación
     */
    crearPartida(): void {
        this.openModal();
    }

    /**
     * Inicia el proceso de edición de una partida existente
     * @param partida Partida a editar
     */
    editarPartida(partida: Partida): void {
        this.openModal(partida);
    }

    /**
     * Elimina una partida con verificación de ID
     * @param partida Partida a eliminar
     */
    eliminarPartida(partida: Partida): void {
        if (!partida.id) return;
        this.deletePartida(partida.id);
    }

}
