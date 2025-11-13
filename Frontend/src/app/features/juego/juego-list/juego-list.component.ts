import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationParams } from '../../../core/models/api-response.model';
import { JuegoService } from '../../../core/services/juego.service';
import { Juego, JuegoFilters } from '../../../shared/models/juego.model';

/**
 * Interfaz para el formulario de creación/edición de juegos
 */
interface JuegoForm {
    nombre: string;
    descripcion?: string;
    costo_base: number;
    creado_por?: string;
}

/**
 * Componente para la gestión y administración de juegos
 *
 * Este componente proporciona funcionalidad completa de CRUD para juegos:
 * - Listar juegos con paginación y filtros
 * - Crear nuevos juegos
 * - Editar juegos existentes
 * - Eliminar juegos con confirmación
 * - Búsqueda y filtrado de juegos
 *
 * @example
 * <app-juego-list></app-juego-list>
 */
@Component({
    selector: 'app-juego-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './juego-list.component.html',
    styleUrls: ['./juego-list.component.scss']
})
export class JuegoListComponent implements OnInit {

    /** Array que almacena la lista de juegos */
    juegos: Juego[] = [];

    /** Indica si se está cargando datos */
    loading = false;

    /** Página actual en la paginación */
    currentPage = 1;

    /** Número total de páginas disponibles */
    totalPages = 1;

    /** Tamaño de página para la paginación */
    pageSize = 10;

    /** Filtros aplicables a la lista de juegos */
    filters: JuegoFilters = {};

    /** Controla la visibilidad del modal de creación/edición */
    showModal = false;

    /** Juego actualmente en edición (null para creación) */
    editingJuego: Juego | null = null;

    /** Datos del formulario para nuevo juego o edición */
    nuevoJuego: JuegoForm = {
        nombre: '',
        descripcion: '',
        costo_base: 0,
        creado_por: '',
    };

    /** Mensaje temporal para feedback al usuario */
    uiMessage: string | null = null;

    /** Controla la visibilidad del modal de confirmación */
    showConfirmModal = false;

    /** Acción a ejecutar tras confirmación */
    confirmAction: (() => void) | null = null;

    /** Mensaje a mostrar en el modal de confirmación */
    confirmMessage = '';

    /**
     * Constructor del componente
     * @param juegoService Servicio para operaciones CRUD de juegos
     */
    constructor(private juegoService: JuegoService) { }

    /**
     * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente
     * Carga la lista de juegos al iniciar
     */
    ngOnInit(): void {
        this.loadJuegos();
    }

    /**
     * Muestra un mensaje temporal al usuario
     * @param message Mensaje a mostrar
     */
    private showMessage(message: string): void {
        this.uiMessage = message;
        setTimeout(() => this.uiMessage = null, 3000);
        console.warn('UI Message:', message);
    }

    /**
     * Muestra un modal de confirmación para acciones críticas
     * @param message Mensaje de confirmación
     * @param action Acción a ejecutar si se confirma
     */
    private showConfirmation(message: string, action: () => void): void {
        this.confirmMessage = message;
        this.confirmAction = action;
        this.showConfirmModal = true;
    }

    /**
     * Ejecuta la acción confirmada por el usuario
     */
    executeConfirmation(): void {
        if (this.confirmAction) this.confirmAction();
        this.showConfirmModal = false;
        this.confirmAction = null;
    }

    /**
     * Cancela la acción pendiente de confirmación
     */
    cancelConfirmation(): void {
        this.showConfirmModal = false;
        this.confirmAction = null;
    }

    /**
     * Carga la lista de juegos desde la API
     * Aplica paginación y filtros actuales
     * Maneja diferentes formatos de respuesta del backend
     */
    loadJuegos(): void {
        this.loading = true;

        const pagination: PaginationParams = {
            page: this.currentPage,
            limit: 1000
        };

        const cleanFilters = Object.fromEntries(
            Object.entries(this.filters).filter(([_, v]) => v !== null && v !== undefined && v !== '')
        );

        this.juegoService.getJuegos(pagination, cleanFilters).subscribe({
            next: (response: any) => {
                console.log('Respuesta del backend (juegos):', response);

                if (Array.isArray(response)) {
                    this.juegos = response;
                } else if (response.data) {
                    this.juegos = response.data;
                } else if (response.results) {
                    this.juegos = response.results;
                } else {
                    this.juegos = [];
                }

                this.totalPages = response.totalPages || 1;
                this.loading = false;
            },
            error: (error) => {
                console.error('Error al cargar juegos:', error);
                this.loading = false;
                this.showMessage('Error al cargar los juegos.');
            }
        });
    }

    /**
     * Maneja el cambio en los filtros de búsqueda
     * Reinicia la paginación y recarga los juegos
     */
    onFilterChange(): void {
        this.currentPage = 1;
        this.loadJuegos();
    }

    /**
     * Limpia todos los filtros aplicados
     * Reinicia la paginación y recarga la lista completa
     */
    clearFilters(): void {
        this.filters = {};
        this.currentPage = 1;
        this.loadJuegos();
    }

    /**
     * Navega a una página específica en la paginación
     * @param page Número de página a la que navegar
     */
    goToPage(page: number): void {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
            this.loadJuegos();
        }
    }

    /**
     * Abre el modal para crear un nuevo juego
     * Reinicia el formulario a valores por defecto
     */
    openCreateModal(): void {
        this.editingJuego = null;
        this.nuevoJuego = {
            nombre: '',
            descripcion: '',
            costo_base: 0,
            creado_por: '',
        };
        this.showModal = true;
    }

    /**
     * Abre el modal para editar un juego existente
     * @param juego Juego a editar
     */
    editJuego(juego: Juego): void {
        this.editingJuego = juego;
        this.nuevoJuego = {
            nombre: juego.nombre,
            descripcion: juego.descripcion || '',
            costo_base: juego.costo_base,
            creado_por: juego.creado_por || '',
        };
        this.showModal = true;
    }

    /**
     * Cierra el modal de creación/edición
     * Reinicia el estado del formulario
     */
    closeModal(): void {
        this.showModal = false;
        this.editingJuego = null;
        this.nuevoJuego = {
            nombre: '',
            descripcion: '',
            costo_base: 0,
            creado_por: '',
        };
    }

    /**
     * Guarda un juego (creación o edición)
     * Valida los datos antes de enviar al servidor
     */
    saveJuego(): void {
        if (!this.nuevoJuego.nombre.trim()) return this.showMessage('El nombre del juego es requerido');
        if (this.nuevoJuego.costo_base <= 0) return this.showMessage('El costo base debe ser mayor a 0');

        const payload: Partial<Juego> = {
            nombre: this.nuevoJuego.nombre,
            descripcion: this.nuevoJuego.descripcion,
            costo_base: this.nuevoJuego.costo_base,
            creado_por: this.nuevoJuego.creado_por
        };

        if (this.editingJuego) {
            this.juegoService.updateJuego(this.editingJuego.id!.toString(), payload).subscribe({
                next: () => {
                    this.showMessage('Juego actualizado con éxito.');
                    this.loadJuegos();
                    this.closeModal();
                },
                error: (error) => {
                    console.error('Error al actualizar juego:', error);
                    this.showMessage('Error al actualizar el juego.');
                }
            });
        } else {
            this.juegoService.createJuego(payload).subscribe({
                next: () => {
                    this.showMessage('Juego creado con éxito.');
                    this.loadJuegos();
                    this.closeModal();
                },
                error: (error) => {
                    console.error('Error al crear juego:', error);
                    this.showMessage('Error al crear el juego.');
                }
            });
        }
    }

    /**
     * Elimina un juego con confirmación previa
     * @param juego Juego a eliminar
     */
    deleteJuego(juego: Juego): void {
        this.showConfirmation(`¿Está seguro de eliminar el juego "${juego.nombre}"?`, () => {
            this.juegoService.deleteJuego(juego.id!.toString()).subscribe({
                next: () => {
                    this.showMessage('Juego eliminado con éxito.');
                    this.loadJuegos();
                },
                error: (error) => {
                    console.error('Error al eliminar juego:', error);
                    this.showMessage('Error al eliminar el juego.');
                }
            });
        });
    }
}
