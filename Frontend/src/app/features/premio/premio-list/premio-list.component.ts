import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationParams } from '../../../core/models/api-response.model';
import { PremioService } from '../../../core/services/premio.service';
import { Premio, PremioFilters } from '../../../shared/models/premio.model';

@Component({
    selector: 'app-premio-list',
    standalone: true,
    templateUrl: './premio-list.component.html',
    imports: [CommonModule, FormsModule]
})
export class PremioListComponent implements OnInit {

    premios: Premio[] = [];
    pagination: PaginationParams = { page: 1, limit: 10 };
    filters: PremioFilters = {};

    showModal = false;

    editingPremio: Premio = {
        id: undefined,
        juego_id: '',
        descripcion: '',
        valor: 0
    };

    constructor(private premioService: PremioService) { }

    ngOnInit(): void {
        this.loadPremios();
    }

    loadPremios(): void {
        this.premioService.getPremios(this.pagination, this.filters)
            .subscribe((resp) => {
                this.premios = resp; // ← ya es un array
            });
    }

    openModal(premio?: Premio): void {
        this.editingPremio = premio
            ? { ...premio }
            : { id: undefined, juego_id: '', descripcion: '', valor: 0 };

        this.showModal = true;
    }

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

    deletePremio(id: string): void {
        this.premioService.deletePremio(id)
            .subscribe(() => this.loadPremios());
    }


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
    crearPremio(): void {
        this.openModal();
    }

    editarPremio(premio: Premio): void {
        this.openModal(premio);
    }

    eliminarPremio(premio: Premio): void {
        if (!premio.id) return;
        this.deletePremio(premio.id);
    }

}
