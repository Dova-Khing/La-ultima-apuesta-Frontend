// src/app/shared/models/partida.model.ts

export interface PartidaBase {
    costo_apuesta: number;
    estado: string;
}

export interface PartidaCreate extends PartidaBase {
    usuario_id: string; // UUID (string)
    juego_id: string;   // UUID (string)
    premio_id?: string; // UUID opcional (string)
}

export interface PartidaUpdate extends Partial<PartidaCreate> { }

export interface Partida extends PartidaBase {
    id: string; // UUID (string)
    usuario_id: string;
    juego_id: string;
    premio_id?: string;
    fecha: string; // Representación de datetime
}

// Interfaz para filtros de la lista
export interface PartidaFilters {
    usuario_id?: string;
    juego_id?: string;
    estado?: string;
}
