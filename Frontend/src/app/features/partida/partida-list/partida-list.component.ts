// src/app/components/partida-list/partida-list.component.ts

import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PartidaService } from '../../../core/services/partida.service';
import { Partida, PartidaFilters } from '../../../shared/models/partida.model';
import { PaginationParams } from '../../../core/models/api-response.model';

@Component({
    selector: 'app-partida-list',
    standalone: true,
    templateUrl: './partida-list.component.html',
    imports: [CommonModule, FormsModule]
})
export class PartidaListComponent implements OnInit {

    partidas: Partida[] = [];
    pagination: PaginationParams = { page: 1, limit: 10 };
    filters: PartidaFilters = {};

    showModal = false;

    // Inicializa el objeto para la edición/creación
    editingPartida: Partida = {
        id: undefined,
        usuario_id: '',
        juego_id: '',
        costo_apuesta: 0,
        estado: 'INICIO', // Estado inicial
        premio_id: undefined,
        fecha: ''
    } as Partida;

    constructor(private partidaService: PartidaService) { }

    ngOnInit(): void {
        this.loadPartidas();
    }

    loadPartidas(): void {
        this.partidaService.getPartidas(this.pagination, this.filters)
            .subscribe((resp) => {
                this.partidas = resp;
            });
    }

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

    deletePartida(id: string): void {
        this.partidaService.deletePartida(id)
            .subscribe(() => this.loadPartidas());
    }

    // Métodos auxiliares para la interfaz
    closeModal(): void {
        this.showModal = false;
    }
    crearPartida(): void {
        this.openModal();
    }
    editarPartida(partida: Partida): void {
        this.openModal(partida);
    }
    eliminarPartida(partida: Partida): void {
        if (!partida.id) return;
        this.deletePartida(partida.id);
    }

}
