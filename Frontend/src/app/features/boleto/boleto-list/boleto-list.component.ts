import { CommonModule, CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { Boleto, BoletoCreate, BoletoUpdate } from '../../../shared/models/boleto.model';
import { BoletoService } from 'src/app/core/services/boleto.service';
import { Usuario } from 'src/app/shared/models/usuario.model';
import { Juego } from 'src/app/shared/models/juego.model';
import { UsuarioService } from 'src/app/core/services/usuario.service';
import { JuegoService } from 'src/app/core/services/juego.service';

@Component({
    selector: 'app-boleto-list',
    standalone: true,
    imports: [CommonModule, FormsModule, CurrencyPipe],
    templateUrl: './boleto-list.component.html',
    styleUrls: ['./boleto-list.component.scss']
})
export class BoletoListComponent implements OnInit {

    boletos: Boleto[] = [];
    usuarios: Usuario[] = [];
    juegos: Juego[] = [];

    showModal = false;
    isEditing = false;

    editingBoleto: Partial<Boleto> = {
        usuario_id: '',
        juego_id: '',
        numeros: '',
        costo: 0
    };

    constructor(
        private boletoService: BoletoService,
        private usuarioService: UsuarioService,
        private juegoService: JuegoService
    ) { }

    ngOnInit(): void {
        this.loadBoletos();
        this.loadUsuarios();
        this.loadJuegos();
    }

    loadBoletos(): void {
        this.boletoService.getBoletos().subscribe({
            next: (data: Boleto[]) => {
                console.log('Boletos recibidos:', data);
                this.boletos = data;
            },
            error: (err) => console.error('Error al cargar boletos:', err)
        });
    }

    loadUsuarios(): void {
        const pagination = { page: 1, limit: 100 };
        this.usuarioService.getUsuarios(pagination).subscribe({
            next: (data) => this.usuarios = data,
            error: (err) => console.error('Error al cargar usuarios:', err)
        });
    }

    loadJuegos(): void {
        this.juegoService.getJuegos({ page: 1, limit: 100 }).subscribe({
            next: (data) => this.juegos = data,
            error: (err) => console.error('Error al cargar juegos:', err)
        });
    }

    openModal(boleto?: Boleto): void {
        this.editingBoleto = boleto
            ? { ...boleto }
            : { usuario_id: '', juego_id: '', numeros: '', costo: 0 };

        if (!boleto) {
            this.editingBoleto.creado_por = 'UsuarioLogueado123';
        }

        this.isEditing = !!boleto;
        this.showModal = true;
    }

    saveBoleto(): void {
        if (!this.editingBoleto.usuario_id || !this.editingBoleto.juego_id ||
            !this.editingBoleto.numeros || this.editingBoleto.costo === undefined) {
            console.error('Faltan datos obligatorios para guardar el boleto.');
            return;
        }

        if (this.editingBoleto.id) {
            const updateData: BoletoUpdate = {
                numeros: this.editingBoleto.numeros!,
                costo: this.editingBoleto.costo!,
                actualizado_por: 'UsuarioEditor123'
            };

            this.boletoService.updateBoleto(this.editingBoleto.id, updateData).subscribe({
                next: () => {
                    this.loadBoletos();
                    this.closeModal();
                },
                error: (err) => console.error('Error al actualizar boleto:', err)
            });

        } else {
            const createData: BoletoCreate = {
                usuario_id: this.editingBoleto.usuario_id!,
                juego_id: this.editingBoleto.juego_id!,
                numeros: this.editingBoleto.numeros!,
                costo: this.editingBoleto.costo!,
                creado_por: this.editingBoleto.creado_por || 'Sistema'
            };

            this.boletoService.createBoleto(createData).subscribe({
                next: () => {
                    this.loadBoletos();
                    this.closeModal();
                },
                error: (err) => console.error('Error al crear boleto:', err)
            });
        }
    }

    deleteBoleto(boleto: Boleto | string): void {
        const id = typeof boleto === 'string' ? boleto : boleto.id;
        if (!id) return;

        if (confirm('¿Seguro que deseas eliminar este boleto?')) {
            this.boletoService.deleteBoleto(id).subscribe({
                next: () => this.loadBoletos(),
                error: (err) => console.error('Error al eliminar boleto:', err)
            });
        }
    }

    closeModal(): void {
        this.showModal = false;
        this.isEditing = false;

        this.editingBoleto = {
            usuario_id: '',
            juego_id: '',
            numeros: '',
            costo: 0
        };
    }

    cancelEdit(): void {
        this.closeModal();
    }

    editBoleto(boleto: Boleto): void {
        this.openModal(boleto);
        this.isEditing = true;
    }

}
