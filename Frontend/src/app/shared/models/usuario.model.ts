// src/app/shared/models/usuario.model.ts
export interface Usuario {
    id: string;
    nombre: string;
    edad: number;
    saldo_inicial: number;
    nombre_usuario: string;
    email: string;
    telefono: string;
    activo: boolean;
    es_admin: boolean;
    contrasena?: string;
    fecha_creacion?: string;
    fecha_edicion?: string;
}

// Crear usuario
export interface CreateUsuarioRequest {
    nombre: string;
    edad: number;
    saldo_inicial: number;
    nombre_usuario: string;
    email: string;
    telefono: string;
    activo: boolean;
    es_admin: boolean;
    contrasena: string;
}

// Actualizar usuario
export interface UpdateUsuarioRequest {
    nombre?: string;
    edad?: number;
    saldo_inicial?: number;
    nombre_usuario?: string;
    email?: string;
    telefono?: string;
    activo?: boolean;
    es_admin?: boolean;
    contrasena?: string;
}

// Filtros de búsqueda
export interface UsuarioFilters {
    nombre?: string;
    email?: string;
    activo?: boolean;
    es_admin?: boolean;
}
