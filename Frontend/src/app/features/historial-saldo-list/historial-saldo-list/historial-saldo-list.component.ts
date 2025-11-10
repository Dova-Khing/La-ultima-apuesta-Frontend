import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationParams } from 'src/app/core/models/api-response.model';
import { HistorialSaldo, HistorialSaldoFilters } from 'src/app/shared/models/historial-saldo.model';
import { HistorialSaldoService } from 'src/app/core/services/historial-saldo.service';

@Component({
    selector: 'app-historial-saldo-list',
    standalone: true,
    templateUrl: './historial-saldo-list.component.html',
    styleUrls: ['./historial-saldo-list.component.scss'],
    imports: [CommonModule, FormsModule]
})
export class HistorialSaldoListComponent implements OnInit {

    historiales: HistorialSaldo[] = [];

    pagination: PaginationParams = { page: 1, limit: 10 };
    filters: HistorialSaldoFilters = {};

    showModal = false;

    editingItem: Partial<HistorialSaldo> = {
        usuario_id: '',
        tipo: 'recarga',
        monto: 0
    };

    constructor(private hsService: HistorialSaldoService) { }

    ngOnInit(): void {
        this.loadHistorial();
    }

    loadHistorial(): void {
        this.hsService.getHistorial(this.pagination, this.filters)
            .subscribe(resp => {
                this.historiales = resp // paginación estándar
            });
    }

    openModal(): void {
        this.editingItem = {
            usuario_id: '',
            tipo: 'recarga',
            monto: 0
        };
        this.showModal = true;
    }

    closeModal(): void {
        this.showModal = false;
    }

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

    delete(id: string): void {
        if (confirm('¿Seguro quieres eliminar este registro del historial?')) {
            this.hsService.delete(id)
                .subscribe(() => this.loadHistorial());
        }
    }

    crearMovimiento(): void {
        this.openModal();
    }

    verDetalles(mov: HistorialSaldo): void {
        console.log('Movimiento:', mov);
        alert(
            `Usuario: ${mov.usuario_id}\n` +
            `Tipo: ${mov.tipo}\n` +
            `Monto: ${mov.monto}`
        );
    }
}
