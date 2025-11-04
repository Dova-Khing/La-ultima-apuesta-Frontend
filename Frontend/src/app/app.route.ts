import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },
    {
        path: 'dashboard',
        loadComponent: () =>
            import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent)
    },
    {
        path: 'usuarios',
        loadComponent: () =>
            import('./features/usuario/usuario-list/usuario-list.component').then(m => m.UsuarioListComponent)
    },
    {
        path: 'premios',
        loadComponent: () =>
            import('./features/premio/premio-list/premio-list.component').then(m => m.PremioListComponent)
    },
    {
        path: 'partidas',
        loadComponent: () =>
            import('./features/partida/partida-list/partida-list.component').then(m => m.PartidaListComponent)
    },
    {
        path: 'juegos',
        loadComponent: () =>
            import('./features/juego/juego-list/juego-list.component').then(m => m.JuegoListComponent)
    },
    {
        path: 'boletos',
        loadComponent: () =>
            import('./features/boleto/boleto-list/boleto-list.component').then(m => m.BoletoListComponent)
    },
    {
        path: 'historial-saldo',
        loadComponent: () =>
            import('./features/historial-saldo/historial-saldo-list/historial-saldo-list.component').then(m => m.HistorialSaldoListComponent)
    },
    {
        path: 'auth',
        loadChildren: () =>
            import('./features/auth/auth.routes').then(m => m.authRoutes)
    },
    {
        path: '**',
        redirectTo: '/dashboard'
    }
];
