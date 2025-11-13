import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationParams } from 'src/app/core/models/api-response.model';
import { HistorialSaldo, HistorialSaldoFilters } from 'src/app/shared/models/historial-saldo.model';
import { HistorialSaldoService } from 'src/app/core/services/historial-saldo.service';

/**
 * Componente para la gestión y visualización del historial de saldos
 *
 * Este componente permite:
 * - Listar el historial de movimientos de saldo con paginación
 * - Filtrar el historial por diferentes criterios
 * - Crear nuevos movimientos de saldo (recargas/gastos)
 * - Eliminar registros del historial
 * - Ver detalles de movimientos específicos
 *
 * @example
 * <app-historial-saldo-list></app-historial-saldo-list>
 */
@Component({
    selector: 'app-historial-saldo-list',
    standalone: true,
    templateUrl: './historial-saldo-list.component.html',
    styleUrls: ['./historial-saldo-list.component.scss'],
    imports: [CommonModule, FormsModule]
})
export class HistorialSaldoListComponent implements OnInit {

    /** Array que almacena la lista de historiales de saldo */
    historiales: HistorialSaldo[] = [];

    /** Parámetros de paginación para la consulta de datos */
    pagination: PaginationParams = { page: 1, limit: 10 };

    /** Filtros aplicables al historial de saldos */
    filters: HistorialSaldoFilters = {};

    /** Controla la visibilidad del modal de creación/edición */
    showModal = false;

    /** Objeto temporal para almacenar los datos del movimiento en edición/creación */
    editingItem: Partial<HistorialSaldo> = {
        usuario_id: '',
        tipo: 'recarga',
        monto: 0
    };

    /**
     * Constructor del componente
     * @param hsService Servicio para operaciones CRUD del historial de saldos
     */
    constructor(private hsService: HistorialSaldoService) { }

    /**
     * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente
     * Carga el historial de saldos al iniciar
     */
    ngOnInit(): void {
        this.loadHistorial();
    }

    /**
     * Carga el historial de saldos desde el servidor
     * Aplica los parámetros de paginación y filtros actuales
     */
    loadHistorial(): void {
        this.hsService.getHistorial(this.pagination, this.filters)
            .subscribe(resp => {
                this.historiales = resp // paginación estándar
            });
    }

    /**
     * Abre el modal para crear un nuevo movimiento
     * Reinicia el objeto editingItem a valores por defecto
     */
    openModal(): void {
        this.editingItem = {
            usuario_id: '',
            tipo: 'recarga',
            monto: 0
        };
        this.showModal = true;
    }

    /**
     * Cierra el modal de creación/edición
     */
    closeModal(): void {
        this.showModal = false;
    }

    /**
     * Guarda un nuevo movimiento de saldo
     * Realiza trim al usuario_id antes de enviar al servidor
     * Recarga el historial y cierra el modal tras guardar exitosamente
     */
    save(): void {
        const itemToSave = { ...this.editingItem };

        if (itemToSave.usuario_id) {
            itemToSave.usuario_id = itemToSave.usuario_id.trim();
        }

        this.hsService.create(itemToSave)
            .subscribe(() => {
                this.loadHistorial();
                this.closeModal();
            });
    }

    /**
     * Elimina un registro del historial de saldos
     * Muestra confirmación antes de proceder con la eliminación
     * @param id Identificador único del registro a eliminar
     */
    delete(id: string): void {
        if (confirm('¿Seguro quieres eliminar este registro del historial?')) {
            this.hsService.delete(id)
                .subscribe(() => this.loadHistorial());
        }
    }

    /**
     * Inicia el proceso de creación de un nuevo movimiento
     * Abre el modal de creación
     */
    crearMovimiento(): void {
        this.openModal();
    }

    /**
     * Muestra los detalles de un movimiento específico
     * @param mov Objeto HistorialSaldo del cual mostrar detalles
     */
    verDetalles(mov: HistorialSaldo): void {
        console.log('Movimiento:', mov);
        alert(
            `Usuario: ${mov.usuario_id}\n` +
            `Tipo: ${mov.tipo}\n` +
            `Monto: ${mov.monto}`
        );
    }
}
