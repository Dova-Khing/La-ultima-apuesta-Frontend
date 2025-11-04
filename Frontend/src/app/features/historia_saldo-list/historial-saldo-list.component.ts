import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

// Interface que define la estructura de un movimiento en el historial de saldo
export interface HistorialSaldo {
    id?: number;
    usuario_id: number;
    tipo: string;   // 'recarga', 'retiro', 'apuesta', etc.
    monto: number;
}

@Component({
    selector: 'app-historial-saldo-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './historial-saldo-list.component.html',
    styleUrls: ['./historial-saldo-list.component.scss']
})
export class HistorialSaldoListComponent implements OnInit {

    // Array con datos de ejemplo
    HISTORIAL_SALDO: HistorialSaldo[] = [
        { id: 1, usuario_id: 1, tipo: 'recarga', monto: 50000 },
        { id: 2, usuario_id: 1, tipo: 'apuesta', monto: -10000 },
        { id: 3, usuario_id: 2, tipo: 'retiro', monto: -20000 },
        { id: 4, usuario_id: 3, tipo: 'recarga', monto: 75000 },
        { id: 5, usuario_id: 3, tipo: 'apuesta', monto: -15000 }
    ];

    constructor() { }

    ngOnInit(): void {
        console.log('Historial de saldo cargado');
    }

    verDetalles(movimiento: HistorialSaldo): void {
        alert(`Movimiento: ${movimiento.tipo.toUpperCase()} - Monto: $${movimiento.monto}`);
    }
}
