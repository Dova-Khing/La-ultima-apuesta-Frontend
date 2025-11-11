export interface BoletoBase {
    usuario_id: string;
    juego_id: string;
    numeros: string;
    costo: number;
}

export interface BoletoCreate extends BoletoBase {
    creado_por: string;
}

export interface BoletoUpdate {
    numeros?: string;
    costo?: number;
    actualizado_por?: string;
}

export interface Boleto extends BoletoBase {
    id: string;
    fecha_registro: string;
    fecha_actualizacion: string | null;
    creado_por: string;
    actualizado_por: string | null;
}

export interface BoletoListResponse {
    boletos: Boleto[];
    total: number;
    pagina: number;
    por_pagina: number;
}
