// src/app/shared/models/juego.model.ts

export interface Juego {
    id?: string;                 // UUID generado por el backend
    nombre: string;              // Nombre del juego (ej. "Bingo")
    descripcion?: string;        // Descripción opcional
    costo_base: number;          // Costo mínimo para jugar
    creado_por: string;          // Usuario que creó el juego
    actualizado_por?: string;    // Usuario que actualizó el juego
    fecha_registro?: string;     // Fecha ISO generada por el backend
    fecha_actualizacion?: string;// Fecha ISO generada por el backend
}

// 🔍 Para filtros en listados
export interface JuegoFilters {
    nombre?: string;
    creado_por?: string;
}

// 📄 Para paginación (si tu API la maneja)
export interface JuegoListResponse {
    juegos: Juego[];  // Lista de juegos
    total: number;    // Total de registros
    pagina: number;   // Página actual
    por_pagina: number; // Registros por página
}
