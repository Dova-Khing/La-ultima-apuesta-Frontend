import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

// Interface para definir la estructura de un premio
export interface Premio {
    id?: number;
    juego_id: number;
    descripcion: string;
    valor: number;
    creado_por?: string;
}

// Array con datos de ejemplo de premios
export const PREMIOS: Premio[] = [
    {
        id: 1,
        juego_id: 101,
        descripcion: 'Premio mayor del sorteo semanal',
        valor: 5000000,
        creado_por: 'admin'
    },
    {
        id: 2,
        juego_id: 102,
        descripcion: 'Segundo lugar torneo relámpago',
        valor: 2000000,
        creado_por: 'admin'
    },
    {
        id: 3,
        juego_id: 103,
        descripcion: 'Premio especial de fidelidad',
        valor: 1000000,
        creado_por: 'sistema'
    },
    {
        id: 4,
        juego_id: 104,
        descripcion: 'Bonificación por participación',
        valor: 500000,
        creado_por: 'soporte'
    },
    {
        id: 5,
        juego_id: 105,
        descripcion: 'Premio sorpresa mensual',
        valor: 1500000,
        creado_por: 'admin'
    }
];

@Component({
    selector: 'app-premio-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './premio-list.component.html',
    styleUrls: ['./premio-list.component.scss']
})
export class PremioListComponent implements OnInit {
    // Propiedad que contiene los premios
    premios: Premio[] = PREMIOS;

    constructor() { }

    ngOnInit() {
        // Lógica de inicialización si se requiere
    }

    crearPremio() {
        console.log('Crear nuevo premio');
        alert('Función de crear premio - Por implementar');
    }

    editarPremio(premio: Premio) {
        console.log('Editar premio:', premio);
        alert(`Editando premio: ${premio.descripcion}`);
    }

    eliminarPremio(premio: Premio) {
        console.log('Eliminar premio:', premio);
        if (confirm(`¿Estás seguro de eliminar "${premio.descripcion}"?`)) {
            this.premios = this.premios.filter(p => p.id !== premio.id);
            alert(`Premio "${premio.descripcion}" eliminado`);
        }
    }
}
