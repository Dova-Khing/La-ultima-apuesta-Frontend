import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationParams } from '../../../core/models/api-response.model';
import { PremioService } from '../../../core/services/premio.service';
import { Premio, PremioFilters } from '../../../shared/models/premio.model';

/**
 * Componente para la gestión y administración de premios
 *
 * Este componente proporciona funcionalidad completa de CRUD para premios:
 * - Listar premios con paginación y filtros
 * - Crear nuevos premios
 * - Editar premios existentes
 * - Eliminar premios
 * - Manejo de premios asociados a juegos
 *
 * @example
 * <app-premio-list></app-premio-list>
 */
@Component({
    selector: 'app-premio-list',
    standalone: true,
    templateUrl: './premio-list.component.html',
    imports: [CommonModule, FormsModule]
})
export class PremioListComponent implements OnInit {

    /** Array que almacena la lista de premios */
    premios: Premio[] = [];

    /** Parámetros de paginación para la consulta de datos */
    pagination: PaginationParams = { page: 1, limit: 10 };

    /** Filtros aplicables a la lista de premios */
    filters: PremioFilters = {};

    /** Controla la visibilidad del modal de creación/edición */
    showModal = false;

    /** Objeto temporal para almacenar los datos del premio en edición/creación */
    editingPremio: Premio = {
        id: undefined,
        juego_id: '',
        descripcion: '',
        valor: 0
    };

    /**
     * Constructor del componente
     * @param premioService Servicio para operaciones CRUD de premios
     */
    constructor(private premioService: PremioService) { }

    /**
     * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente
     * Carga la lista de premios al iniciar
     */
    ngOnInit(): void {
        this.loadPremios();
    }

    /**
     * Carga los premios desde el servidor
     * Aplica los parámetros de paginación y filtros actuales
     */
    loadPremios(): void {
        this.premioService.getPremios(this.pagination, this.filters)
            .subscribe((resp) => {
                this.premios = resp; // ← ya es un array
            });
    }

    /**
     * Abre el modal para crear o editar un premio
     * @param premio Premio a editar (opcional, si no se proporciona se crea nuevo)
     */
    openModal(premio?: Premio): void {
        this.editingPremio = premio
            ? { ...premio }
            : { id: undefined, juego_id: '', descripcion: '', valor: 0 };

        this.showModal = true;
    }

    /**
     * Guarda un premio (creación o edición)
     * Realiza limpieza de UUIDs para evitar errores de validación
     * Maneja tanto creación como actualización según la presencia de ID
     * Incluye corrección específica para actualización eliminando ID del cuerpo
     */
    savePremio(): void {

        const premioToSave: any = { ...this.editingPremio }; // Usar 'any' para permitir la eliminación de propiedades

        if (premioToSave.juego_id) {

            premioToSave.juego_id = premioToSave.juego_id.trim();
        }

        if (premioToSave.id) {
            // --- INICIO DE CORRECCIÓN ---

            // 1. Extraer el ID para la URL
            const premioId = premioToSave.id;

            // 2. Eliminar el ID del cuerpo de la petición (FastAPI no lo espera)
            delete premioToSave.id;

            this.premioService.updatePremio(premioId, premioToSave)
                .subscribe({
                    next: () => {
                        this.loadPremios();
                        this.showModal = false;
                    },
                    error: (err) => {
                        console.error("Error al actualizar premio:", err);
                        // Puedes añadir lógica para mostrar un mensaje de error al usuario
                    }
                });
            // --- FIN DE CORRECCIÓN ---

        } else {
            // Crear
            this.premioService.createPremio(premioToSave) // Usar el objeto limpio
                .subscribe(() => {
                    this.loadPremios();
                    this.showModal = false;
                });
        }
    }

    /**
     * Elimina un premio específico
     * @param id Identificador único del premio a eliminar
     */
    deletePremio(id: string): void {
        this.premioService.deletePremio(id)
            .subscribe(() => this.loadPremios());
    }


    /**
     * Cierra el modal de creación/edición
     * Reinicia el formulario a valores por defecto
     */
    closeModal(): void {
        this.showModal = false;

        // Si quieres limpiar el formulario cada vez:
        this.editingPremio = {
            id: undefined,
            juego_id: '',
            descripcion: '',
            valor: 0
        };
    }

    /**
     * Inicia el proceso de creación de un nuevo premio
     * Abre el modal de creación
     */
    crearPremio(): void {
        this.openModal();
    }

    /**
     * Inicia el proceso de edición de un premio existente
     * @param premio Premio a editar
     */
    editarPremio(premio: Premio): void {
        this.openModal(premio);
    }

    /**
     * Elimina un premio con verificación de ID
     * @param premio Premio a eliminar
     */
    eliminarPremio(premio: Premio): void {
        if (!premio.id) return;
        this.deletePremio(premio.id);
    }

}
