import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationParams } from '../../../core/models/api-response.model';
import { JuegoService } from '../../../core/services/juego.service';
import { Juego, JuegoFilters } from '../../../shared/models/juego.model';

interface JuegoForm {
    nombre: string;
    descripcion?: string;
    costo_base: number;
    creado_por?: string;
}

@Component({
    selector: 'app-juego-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './juego-list.component.html',
    styleUrls: ['./juego-list.component.scss']
})
export class JuegoListComponent implements OnInit {

    juegos: Juego[] = [];
    loading = false;
    currentPage = 1;
    totalPages = 1;
    pageSize = 10;

    filters: JuegoFilters = {};

    showModal = false;
    editingJuego: Juego | null = null;

    nuevoJuego: JuegoForm = {
        nombre: '',
        descripcion: '',
        costo_base: 0,
        creado_por: '',
    };

    uiMessage: string | null = null;
    showConfirmModal = false;
    confirmAction: (() => void) | null = null;
    confirmMessage = '';

    constructor(private juegoService: JuegoService) { }

    ngOnInit(): void {
        this.loadJuegos();
    }

    private showMessage(message: string): void {
        this.uiMessage = message;
        setTimeout(() => this.uiMessage = null, 3000);
        console.warn('UI Message:', message);
    }

    private showConfirmation(message: string, action: () => void): void {
        this.confirmMessage = message;
        this.confirmAction = action;
        this.showConfirmModal = true;
    }

    executeConfirmation(): void {
        if (this.confirmAction) this.confirmAction();
        this.showConfirmModal = false;
        this.confirmAction = null;
    }

    cancelConfirmation(): void {
        this.showConfirmModal = false;
        this.confirmAction = null;
    }

    // 🔹 Cargar juegos desde la API
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

    onFilterChange(): void {
        this.currentPage = 1;
        this.loadJuegos();
    }

    clearFilters(): void {
        this.filters = {};
        this.currentPage = 1;
        this.loadJuegos();
    }

    goToPage(page: number): void {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
            this.loadJuegos();
        }
    }

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
