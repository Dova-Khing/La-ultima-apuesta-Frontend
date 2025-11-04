import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

// Interface que define la estructura de un boleto
export interface Boleto {
    id?: number;
    usuario_id: number;
    juego_id: number;
    numeros?: string;
    costo: number;
    creado_por?: string;
}

@Component({
    selector: 'app-boleto-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './boleto-list.component.html',
    styleUrls: ['./boleto-list.component.scss']
})
export class BoletoListComponent implements OnInit {

    // Array con boletos de ejemplo
    BOLETOS: Boleto[] = [
        { id: 1, usuario_id: 1, juego_id: 3, numeros: '05, 12, 23, 34, 45', costo: 10000, creado_por: 'admin' },
        { id: 2, usuario_id: 2, juego_id: 1, numeros: '07, 18, 29, 33, 42', costo: 8000, creado_por: 'system' },
        { id: 3, usuario_id: 1, juego_id: 2, numeros: '03, 09, 15, 22, 36', costo: 12000 },
        { id: 4, usuario_id: 3, juego_id: 4, numeros: '11, 16, 21, 32, 40', costo: 15000, creado_por: 'admin' }
    ];

    constructor() { }

    ngOnInit(): void {
        console.log('Boletos cargados correctamente');
    }

    verDetalles(boleto: Boleto): void {
        alert(`Boleto del usuario ${boleto.usuario_id} para el juego ${boleto.juego_id}\nCosto: $${boleto.costo}`);
    }
}
