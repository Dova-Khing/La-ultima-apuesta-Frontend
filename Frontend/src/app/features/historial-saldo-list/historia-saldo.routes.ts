import { Routes } from '@angular/router';
import { HistorialSaldoListComponent } from './historial-saldo-list/historial-saldo-list.component';

/**
 * Define las rutas para el módulo de Historial Saldo.
 * * Mapea la ruta raíz ('') del módulo al HistorialSaldoListComponent.
 */
export const HistorialSaldoRoutes: Routes = [
    {
        path: '',
        component: HistorialSaldoListComponent
    }
];
