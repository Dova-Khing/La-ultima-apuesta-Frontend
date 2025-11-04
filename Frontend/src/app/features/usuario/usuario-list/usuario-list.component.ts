import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

// Interface para definir la estructura de un usuario
export interface Usuario {
    id?: number;
    nombre: string;
    nombre_usuario: string;
    email: string;
    contrasena: string;
    telefono?: string;
    edad?: number;
    saldo_inicial?: number;
    es_admin: boolean;
}

// Array con datos de ejemplo de usuarios
export const USUARIOS: Usuario[] = [
    {
        id: 1,
        nombre: 'Carlos Pérez',
        nombre_usuario: 'cperez',
        email: 'carlos.perez@example.com',
        contrasena: '1234',
        telefono: '3101234567',
        edad: 28,
        saldo_inicial: 50000,
        es_admin: true
    },
    {
        id: 2,
        nombre: 'María López',
        nombre_usuario: 'mlopez',
        email: 'maria.lopez@example.com',
        contrasena: 'abcd',
        telefono: '3119876543',
        edad: 32,
        saldo_inicial: 30000,
        es_admin: false
    },
    {
        id: 3,
        nombre: 'Andrés Gómez',
        nombre_usuario: 'agomez',
        email: 'andres.gomez@example.com',
        contrasena: 'pass2025',
        telefono: '3004567890',
        edad: 24,
        saldo_inicial: 10000,
        es_admin: false
    },
    {
        id: 4,
        nombre: 'Luisa Martínez',
        nombre_usuario: 'lmartinez',
        email: 'luisa.martinez@example.com',
        contrasena: 'lmart123',
        telefono: '3123456789',
        edad: 27,
        saldo_inicial: 75000,
        es_admin: true
    },
    {
        id: 5,
        nombre: 'Pedro Rojas',
        nombre_usuario: 'projas',
        email: 'pedro.rojas@example.com',
        contrasena: 'pedrito',
        telefono: '3158765432',
        edad: 30,
        saldo_inicial: 20000,
        es_admin: false
    }
];

@Component({
    selector: 'app-usuario-list',
    standalone: true,
    imports: [CommonModule, RouterModule],
    templateUrl: './usuario-list.component.html',
    styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent implements OnInit {
    // Propiedad que usa el componente (inicializada con los datos de ejemplo)
    usuarios: Usuario[] = USUARIOS;

    constructor() { }

    ngOnInit() {
        // Si más adelante cargas desde un servicio, reemplaza la asignación a USUARIOS por la llamada HTTP.
    }

    crearUsuario() {
        console.log('Crear nuevo usuario');
        alert('Función de crear usuario - Por implementar');
    }

    editarUsuario(usuario: Usuario) {
        console.log('Editar usuario:', usuario);
        alert(`Editando usuario: ${usuario.nombre}`);
    }

    eliminarUsuario(usuario: Usuario) {
        console.log('Eliminar usuario:', usuario);
        if (confirm(`¿Estás seguro de eliminar ${usuario.nombre}?`)) {
            // Aquí podrías eliminar del array o llamar al servicio
            this.usuarios = this.usuarios.filter(u => u.id !== usuario.id);
            alert(`Usuario ${usuario.nombre} eliminado`);
        }
    }
}
