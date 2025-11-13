import { Routes } from '@angular/router';
import { MainLayoutComponent } from './core/layouts/main-layout/main-layout.component';
import { AuthLayoutComponent } from './core/layouts/auth-layout/auth-layout.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    },

    {
        path: '',
        component: MainLayoutComponent,
        children: [
            {
                path: 'dashboard',
                loadComponent: () =>
                    import('./features/dashboard/dashboard.component')
                        .then(m => m.DashboardComponent)
            },
            {
                path: 'usuarios',
                loadChildren: () =>
                    import('./features/usuario/usuario.routes')
                        .then(m => m.usuarioRoutes)
            },
            {
                path: 'premios',
                loadComponent: () =>
                    import('./features/premio/premio-list/premio-list.component')
                        .then(m => m.PremioListComponent)
            },
            {
                path: 'partidas',
                loadComponent: () =>
                    import('./features/partida/partida-list/partida-list.component')
                        .then(m => m.PartidaListComponent)
            },
            {
                path: 'juegos',
                loadChildren: () =>
                    import('./features/juego/juego.routes')
                        .then(m => m.juegoRoutes)
            },
            {
                path: 'boletos',
                loadComponent: () =>
                    import('./features/boleto/boleto-list/boleto-list.component')
                        .then(m => m.BoletoListComponent)
            },
            {
                path: 'historial-saldo',
                loadComponent: () =>
                    import('./features/historial-saldo-list/historial-saldo-list/historial-saldo-list.component')
                        .then(m => m.HistorialSaldoListComponent)
            }
        ]
    },

    {
        path: 'auth',
        component: AuthLayoutComponent,
        loadChildren: () =>
            import('./features/auth/auth.routes')
                .then(m => m.authRoutes)
    },

    {
        path: '**',
        redirectTo: '/dashboard'
    }
];