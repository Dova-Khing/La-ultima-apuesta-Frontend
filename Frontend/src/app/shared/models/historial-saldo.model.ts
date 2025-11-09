

/** * Interfaz base para los datos que no son generados por el backend (IDs, fechas).
 */
export interface HistorialSaldoBase {
    usuario_id: string; // UUID (string) - Clave foránea
    tipo: string;       // recarga, apuesta, premio
    monto: number;
}

/** * Interfaz para enviar datos al endpoint POST (Creación).
 */
export interface HistorialSaldoCreate extends HistorialSaldoBase { }

/** * Interfaz de respuesta completa del backend (GET o POST response).
 */
export interface HistorialSaldo extends HistorialSaldoBase {
    id: string;         // UUID del registro (generado)
    fecha: string;      // Timestamp del registro (generado)
}


export interface HistorialSaldoFilters {
    search?: string;
    page?: number;
    limit?: number;
    usuario_id?: string;
    tipo?: string;
}


export interface HistorialSaldoListResponse {
    historial: HistorialSaldo[];
    total: number;
    pagina: number;
    por_pagina: number;
}
