import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { PaginationParams } from '../../../core/models/api-response.model';
import { UsuarioService } from '../../../core/services/usuario.service';
import { Usuario, UsuarioFilters } from '../../../shared/models/usuario.model';

/**
 * Interfaz para el formulario de creación/edición de usuarios
 */
interface UsuarioForm {
    nombre: string;
    email: string;
    activo: boolean;
    edad: number;
    saldo_inicial: number;
    nombre_usuario: string;
    telefono: string;
    es_admin: boolean;
    contrasena: string;
}

/**
 * Interfaz para el payload de la API al crear/actualizar usuarios
 */
interface ApiUsuarioPayload {
    nombre: string;
    email: string;
    activo: boolean;
    edad: string;
    saldo_inicial: number;
    nombre_usuario: string;
    telefono: string;
    es_admin: boolean;
    contrasena?: string;
}

/**
 * Componente para la gestión y administración de usuarios
 *
 * Este componente proporciona funcionalidad completa de CRUD para usuarios:
 * - Listar usuarios con paginación y filtros
 * - Crear nuevos usuarios
 * - Editar usuarios existentes
 * - Eliminar usuarios con confirmación
 * - Validación de datos de usuario (edad, campos requeridos, etc.)
 * - Manejo de estados de usuario (activo/inactivo, admin/no admin)
 *
 * @example
 * <app-usuario-list></app-usuario-list>
 */
@Component({
    selector: 'app-usuario-list',
    standalone: true,
    imports: [CommonModule, FormsModule],
    templateUrl: './usuario-list.component.html',
    styleUrls: ['./usuario-list.component.scss']
})
export class UsuarioListComponent implements OnInit {

    /** Array que almacena la lista de usuarios */
    usuarios: Usuario[] = [];

    /** Indica si se está cargando datos */
    loading = false;

    /** Página actual en la paginación */
    currentPage = 1;

    /** Número total de páginas disponibles */
    totalPages = 1;

    /** Tamaño de página para la paginación */
    pageSize = 10;

    /** Filtros aplicables a la lista de usuarios */
    filters: UsuarioFilters = {};

    /** Controla la visibilidad del modal de creación/edición */
    showModal = false;

    /** Usuario actualmente en edición (null para creación) */
    editingUsuario: Usuario | null = null;

    /** Datos del formulario para nuevo usuario o edición */
    nuevoUsuario: UsuarioForm = {
        nombre: '',
        email: '',
        activo: true,
        edad: 0,
        saldo_inicial: 0,
        nombre_usuario: '',
        telefono: '',
        es_admin: false,
        contrasena: '',
    };

    /** Mensaje temporal para feedback al usuario */
    uiMessage: string | null = null;

    /** Controla la visibilidad del modal de confirmación */
    showConfirmModal = false;

    /** Acción a ejecutar tras confirmación */
    confirmAction: (() => void) | null = null;

    /** Mensaje a mostrar en el modal de confirmación */
    confirmMessage = '';

    /**
     * Constructor del componente
     * @param usuarioService Servicio para operaciones CRUD de usuarios
     */
    constructor(private usuarioService: UsuarioService) { }

    /**
     * Método del ciclo de vida de Angular que se ejecuta al inicializar el componente
     * Carga la lista de usuarios al iniciar
     */
    ngOnInit(): void {
        this.loadUsuarios();
    }

    /**
     * Muestra un mensaje temporal al usuario
     * @param message Mensaje a mostrar
     */
    private showMessage(message: string): void {
        this.uiMessage = message;
        setTimeout(() => this.uiMessage = null, 3000);
        console.warn('UI Message:', message);
    }

    /**
     * Muestra un modal de confirmación para acciones críticas
     * @param message Mensaje de confirmación
     * @param action Acción a ejecutar si se confirma
     */
    private showConfirmation(message: string, action: () => void): void {
        this.confirmMessage = message;
        this.confirmAction = action;
        this.showConfirmModal = true;
    }

    /**
     * Ejecuta la acción confirmada por el usuario
     */
    executeConfirmation(): void {
        if (this.confirmAction) this.confirmAction();
        this.showConfirmModal = false;
        this.confirmAction = null;
    }

    /**
     * Cancela la acción pendiente de confirmación
     */
    cancelConfirmation(): void {
        this.showConfirmModal = false;
        this.confirmAction = null;
    }

    /**
     * Carga los usuarios desde la API
     * Aplica paginación y filtros actuales
     * Maneja diferentes formatos de respuesta del backend
     */
    loadUsuarios(): void {
        this.loading = true;

        const pagination: PaginationParams = {
            page: this.currentPage,
            limit: 1000
        };

        // Limpieza de filtros para evitar enviar null/undefined
        const cleanFilters = Object.fromEntries(
            Object.entries(this.filters).filter(([_, v]) => v !== null && v !== undefined && v !== '')
        );

        this.usuarioService.getUsuarios(pagination, cleanFilters).subscribe({
            next: (response: any) => {
                console.log(' Respuesta del backend:', response);

                // Detectar formato de respuesta
                if (Array.isArray(response)) {
                    this.usuarios = response;
                } else if (response.data) {
                    this.usuarios = response.data;
                } else if (response.results) {
                    this.usuarios = response.results;
                } else {
                    console.warn('⚠️ No se encontró la propiedad esperada en la respuesta.');
                    this.usuarios = [];
                }

                this.totalPages = response.totalPages || 1;
                this.loading = false;
            },
            error: (error) => {
                console.error(' Error al cargar usuarios:', error);
                this.loading = false;
                this.showMessage('Error al cargar usuarios.');
            }
        });
    }

    /**
     * Maneja el cambio en los filtros de búsqueda
     * Reinicia la paginación y recarga los usuarios
     */
    onFilterChange(): void {
        this.currentPage = 1;
        this.loadUsuarios();
    }

    /**
     * Limpia todos los filtros aplicados
     * Reinicia la paginación y recarga la lista completa
     */
    clearFilters(): void {
        this.filters = {};
        this.currentPage = 1;
        this.loadUsuarios();
    }

    /**
     * Navega a una página específica en la paginación
     * @param page Número de página a la que navegar
     */
    goToPage(page: number): void {
        if (page >= 1 && page <= this.totalPages) {
            this.currentPage = page;
            this.loadUsuarios();
        }
    }

    /**
     * Abre el modal para crear un nuevo usuario
     * Reinicia el formulario a valores por defecto
     */
    openCreateModal(): void {
        this.editingUsuario = null;
        this.nuevoUsuario = {
            nombre: '',
            email: '',
            activo: true,
            edad: 0,
            saldo_inicial: 0,
            nombre_usuario: '',
            telefono: '',
            es_admin: false,
            contrasena: '',
        };
        this.showModal = true;
    }

    /**
     * Abre el modal para editar un usuario existente
     * @param usuario Usuario a editar
     */
    editUsuario(usuario: Usuario): void {
        this.editingUsuario = usuario;
        this.nuevoUsuario = {
            nombre: usuario.nombre,
            email: usuario.email || '',
            activo: usuario.activo,
            edad: usuario.edad,
            saldo_inicial: usuario.saldo_inicial,
            nombre_usuario: usuario.nombre_usuario,
            telefono: usuario.telefono,
            es_admin: usuario.es_admin,
            contrasena: '',
        };
        this.showModal = true;
    }

    /**
     * Cierra el modal de creación/edición
     * Reinicia el estado del formulario
     */
    closeModal(): void {
        this.showModal = false;
        this.editingUsuario = null;
        this.nuevoUsuario = {
            nombre: '',
            email: '',
            activo: true,
            edad: 0,
            saldo_inicial: 0,
            nombre_usuario: '',
            telefono: '',
            es_admin: false,
            contrasena: '',
        };
    }

    /**
     * Guarda un usuario (creación o edición)
     * Valida los datos antes de enviar al servidor
     * Maneja conversión de tipos y errores de la API
     */
    saveUsuario(): void {
        if (!this.nuevoUsuario.nombre.trim()) return this.showMessage('El nombre es requerido');
        if (!this.nuevoUsuario.email.trim()) return this.showMessage('El correo electrónico es requerido');
        if (!this.nuevoUsuario.nombre_usuario.trim()) return this.showMessage('El nombre de usuario es requerido');
        if (!this.editingUsuario && !this.nuevoUsuario.contrasena.trim()) return this.showMessage('La contraseña es requerida');
        if (!this.nuevoUsuario.edad || this.nuevoUsuario.edad <= 18) return this.showMessage('La edad debe ser mayor a 18');

        const userData: Partial<ApiUsuarioPayload> = {
            nombre: this.nuevoUsuario.nombre,
            email: this.nuevoUsuario.email,
            activo: this.nuevoUsuario.activo,
            edad: String(this.nuevoUsuario.edad),
            saldo_inicial: this.nuevoUsuario.saldo_inicial,
            nombre_usuario: this.nuevoUsuario.nombre_usuario,
            telefono: this.nuevoUsuario.telefono,
            es_admin: this.nuevoUsuario.es_admin,
        };

        if (!this.editingUsuario || this.nuevoUsuario.contrasena.trim()) {
            userData.contrasena = this.nuevoUsuario.contrasena;
        }

        if (this.editingUsuario) {
            this.usuarioService.updateUsuario(this.editingUsuario.id, userData as any).subscribe({
                next: () => {
                    this.showMessage('Usuario actualizado con éxito.');
                    this.loadUsuarios();
                    this.closeModal();
                },
                error: (error) => {
                    console.error('Error al actualizar usuario:', error);
                    const errorMessage = error.error?.detail || 'Error al actualizar el usuario.';
                    this.showMessage(errorMessage);
                }
            });
        } else {
            this.usuarioService.createUsuario(userData as any).subscribe({
                next: () => {
                    this.showMessage('Usuario creado con éxito.');
                    this.loadUsuarios(); // recarga todos los usuarios
                    this.closeModal();
                },
                error: (error) => {
                    console.error(' Error al crear usuario (API):', error.error);
                    let displayMessage = 'Error al crear el usuario. Verifica los campos.';
                    if (error.error && typeof error.error.detail === 'string') displayMessage = error.error.detail;
                    else if (error.error && Array.isArray(error.error.detail)) {
                        displayMessage = error.error.detail.map((err: any) =>
                            `${err.loc.join(' -> ')}: ${err.msg}`
                        ).join('; ');
                    }
                    this.showMessage(displayMessage);
                }
            });
        }
    }

    /**
     * Elimina un usuario con confirmación previa
     * @param usuario Usuario a eliminar
     */
    deleteUsuario(usuario: Usuario): void {
        this.showConfirmation(`¿Está seguro de eliminar al usuario "${usuario.nombre}"?`, () => {
            this.usuarioService.deleteUsuario(usuario.id).subscribe({
                next: () => {
                    this.showMessage('Usuario eliminado con éxito.');
                    this.loadUsuarios();
                },
                error: (error) => {
                    console.error(' Error al eliminar usuario:', error);
                    this.showMessage('Error al eliminar el usuario.');
                }
            });
        });
    }
}
