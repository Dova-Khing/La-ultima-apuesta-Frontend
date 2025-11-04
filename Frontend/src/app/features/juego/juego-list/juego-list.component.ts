import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

// Interface que define la estructura de un juego
export interface Juego {
    id?: number;
    nombre: string;
    descripcion?: string;
    costo_base: number;
    creado_por?: string;
}

@Component({
    selector: 'app-juego-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './juego-list.component.html',
    styleUrls: ['./juego-list.component.scss']
})
export class JuegoListComponent implements OnInit {

    // Datos de ejemplo de juegos
    juegos: Juego[] = [
        { id: 1, nombre: 'Ruleta', descripcion: 'Juego clásico de apuestas en ruleta', costo_base: 2000, creado_por: 'admin' },
        { id: 2, nombre: 'Blackjack', descripcion: 'Juego de cartas contra la banca', costo_base: 3500, creado_por: 'admin' },
        { id: 3, nombre: 'Tragamonedas', descripcion: 'Máquina de azar con premios aleatorios', costo_base: 1500, creado_por: 'sistema' },
        { id: 4, nombre: 'Dados', descripcion: 'Juego de azar con dados dobles', costo_base: 2500, creado_por: 'croupier1' },
        { id: 5, nombre: 'Apuestas Deportivas', descripcion: 'Apuesta en eventos deportivos en vivo', costo_base: 5000, creado_por: 'admin' }
    ];

    constructor() { }

    ngOnInit() {
        console.log('Componente JuegoList inicializado');
    }

    crearJuego() {
        alert('Función de crear juego - por implementar');
    }

    editarJuego(juego: Juego) {
        alert(`Editando juego: ${juego.nombre}`);
    }

    eliminarJuego(juego: Juego) {
        if (confirm(`¿Eliminar el juego "${juego.nombre}"?`)) {
            alert(`Juego eliminado`);
        }
    }
}
