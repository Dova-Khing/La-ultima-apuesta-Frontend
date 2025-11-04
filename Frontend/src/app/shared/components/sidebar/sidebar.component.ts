import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

/**
 * Interface para definir todas las rutas del menú
 */
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}



/**
 * Lo siguiente es un array con todas las rutas disponibles
 * del Sidebar
 */
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard', icon: 'design_app', class: '' },
    { path: '/categorias', title: 'Categorías', icon: 'shopping_basket', class: '' },
    { path: '/usuarios', title: 'Usuarios', icon: 'users_single-02', class: '' },
    { path: '/productos', title: 'Productos', icon: 'shopping_box', class: '' },
    { path: '/notifications', title: 'Notificaciones', icon: 'ui-1_bell-53', class: '' },
    { path: '/upgrade', title: 'Configuración', icon: 'objects_spaceship', class: 'active active-pro' }
];

@Component({
    selector: 'app-sidebar',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    // Array que contendrá los elementos del menú
    menuItems: RouteInfo[] = [];

    constructor() { }

    ngOnInit() {
        /**
         *Cargar las rutas en el array del menú
         */
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    // Método para detectar si es vista móvil
    isMobileMenu(): boolean {
        return window.innerWidth <= 991;
    }
}
