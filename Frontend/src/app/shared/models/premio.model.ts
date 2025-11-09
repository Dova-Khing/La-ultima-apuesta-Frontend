export interface Premio {
    id?: string;
    juego_id: string;
    descripcion: string;
    valor: number;
    fecha_registro?: string;
    fecha_actualizacion?: string;
    creado_por?: string;
    actualizado_por?: string;
}


// Filtros opcionales para tablas filtradas/paginación
export interface PremioFilters {
    search?: string;
    page?: number;
    page_size?: number;
    juego_id?: string;
}

// Respuesta paginada del backend
export interface PremioListResponse {
    premios: Premio[];
    total: number;
    pagina: number;
    por_pagina: number;
}
