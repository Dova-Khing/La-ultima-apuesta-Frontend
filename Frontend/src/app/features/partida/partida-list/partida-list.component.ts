import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

// Interface que define la estructura de una partida
export interface Partida {
    id?: number;
    usuario_id: number;
    juego_id: number;
    costo_apuesta: number;
    estado: string;
    premio_id?: number;
}

@Component({
    selector: 'app-partida-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './partida-list.component.html',
    styleUrls: ['./partida-list.component.scss']
})
export class PartidaListComponent implements OnInit {

    // Datos de ejemplo de partidas
    partidas: Partida[] = [
        { id: 1, usuario_id: 1, juego_id: 101, costo_apuesta: 5000, estado: 'Ganada', premio_id: 1 },
        { id: 2, usuario_id: 2, juego_id: 102, costo_apuesta: 3000, estado: 'Perdida' },
        { id: 3, usuario_id: 3, juego_id: 103, costo_apuesta: 10000, estado: 'En curso' },
        { id: 4, usuario_id: 4, juego_id: 104, costo_apuesta: 7000, estado: 'Ganada', premio_id: 2 },
        { id: 5, usuario_id: 5, juego_id: 105, costo_apuesta: 2000, estado: 'Cancelada' }
    ];

    constructor() { }

    ngOnInit() {
        console.log('Componente PartidaList inicializado');
    }

    crearPartida() {
        alert('Función de crear partida - por implementar');
    }

    editarPartida(partida: Partida) {
        alert(`Editando partida con ID: ${partida.id}`);
    }

    eliminarPartida(partida: Partida) {
        if (confirm(`¿Eliminar partida con ID ${partida.id}?`)) {
            alert(`Partida eliminada`);
        }
    }
}
