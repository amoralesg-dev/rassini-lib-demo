import { Component } from '@angular/core';
import { ButtonModule } from 'primeng/button';


import { UsuarioFormComponent }
from './components/usuario-form/usuario-form';

import {
    AppToast,
    AppConfirmDialog,
    AppDialog,
    DataTable,
    DataTableColumn,
    PageContentComponent,
    PageHeaderComponent,
    PageToolbarComponent,
    Toast,
    Dialog
} from 'rassini-ui';

interface Usuario {

    id: number;

    nombre: string;

    correo: string;

    rol: string;

}

@Component({
    selector: 'app-usuarios',
    standalone: true,
    imports: [
      PageHeaderComponent,
      PageToolbarComponent,
      PageContentComponent,
      DataTable,
      AppDialog,
      AppToast,
      AppConfirmDialog,
      ButtonModule,
      UsuarioFormComponent
  ],
    templateUrl: './usuarios.html',
    styleUrl: './usuarios.scss'
})
export class UsuariosComponent {

    private readonly STORAGE_KEY =
        'rassini-usuarios';

    selectedUsers: any[] = [];

    usuarioEditandoId: number | null = null;

    mostrarSeleccionadosDialog = false;
    modoEdicion = false;

    private readonly DEFAULT_USERS: Usuario[] = [

        {
            id: 1,
            nombre: 'Administrador',
            correo: 'admin@rassini.com',
            rol: 'ADMIN'
        },

        {
            id: 2,
            nombre: 'Usuario Demo',
            correo: 'demo@rassini.com',
            rol: 'USER'
        }

    ];

    onSelectionChange(users: any[]): void {

        this.selectedUsers = users;

    }
    mostrarSeleccionados(): void {

        this.mostrarSeleccionadosDialog = true;

    }

    constructor(
    private readonly toast: Toast,
    private readonly dialog: Dialog
    ) {

        console.log('USUARIOS COMPONENT');

        this.cargarUsuarios();

    }

    mostrarDialogo = false;

    usuario = {

        nombre: '',

        correo: '',

        rol: 'USER'

    };

    columns: DataTableColumn[] = [

        {
            field: 'id',
            header: 'ID',
            sortable: true
        },

        {
            field: 'nombre',
            header: 'Nombre',
            sortable: true
        },

        {
            field: 'correo',
            header: 'Correo',
            sortable: true
        },

        {
            field: 'rol',
            header: 'Rol',
            sortable: true
        },
        {
            field: 'actions',
            header: 'Acciones',
            type: 'actions'
        }

    ];

    usuarios: Usuario[] = [];

    private cargarUsuarios(): void {

        const usuarios =
            localStorage.getItem(
                this.STORAGE_KEY
            );

        if (usuarios) {

            this.usuarios =
                JSON.parse(usuarios);

            return;

        }

        this.usuarios = [
            ...this.DEFAULT_USERS
        ];

        this.guardarStorage();

    }

    private guardarStorage(): void {

        localStorage.setItem(

            this.STORAGE_KEY,

            JSON.stringify(
                this.usuarios
            )

        );

    }

    nuevoUsuario(): void {

      this.modoEdicion = false;

      this.usuarioEditandoId = null;

      this.usuario = {

          nombre: '',

          correo: '',

          rol: 'USER'

      };

      this.mostrarDialogo = true;

  }

    cerrarDialogo(): void {

        this.mostrarDialogo = false;

    }

    guardarUsuario(usuario: any): void {

        if (

            this.modoEdicion

            &&

            this.usuarioEditandoId

        ) {

            const existente =
                this.usuarios.find(

                    usuario =>
                        usuario.id ===
                        this.usuarioEditandoId

                );

            if (existente) {

                existente.nombre =
                    usuario.nombre;

                existente.correo =
                    usuario.correo;

                existente.rol =
                    usuario.rol;

            }

        } else {

            const nextId = Math.max(

                ...this.usuarios.map(
                    usuario => usuario.id
                ),

                0

            ) + 1;

            this.usuarios.push({

                id: nextId,

                nombre: usuario.nombre,

                correo: usuario.correo,

                rol: usuario.rol

            });

        }

        this.guardarStorage();

        this.mostrarDialogo = false;

    }

    eliminarUsuario(usuario: Usuario): void {

      console.log('ELIMINAR CLICK', usuario);

      this.dialog.confirm({

          header: 'Eliminar Usuario',

          message: `¿Deseas eliminar a ${usuario.nombre}?`,

          accept: () => {

              console.log('ACEPTO');

          }

      });

  }

    exportar(): void {

      console.log('PROBANDO TOAST');

      this.toast.success(
          'Export success'
      );

        const headers = [

            'ID',
            'Nombre',
            'Correo',
            'Rol'

        ];

        const rows = this.usuarios.map(

            usuario => [

                usuario.id,

                usuario.nombre,

                usuario.correo,

                usuario.rol

            ].join(',')

        );

        const csv = [

            headers.join(','),

            ...rows

        ].join('\n');

        const blob = new Blob(

            [csv],

            {
                type: 'text/csv;charset=utf-8;'
            }

        );

        const url =
            URL.createObjectURL(blob);

        const link =
            document.createElement('a');

        link.href = url;

        link.download =
            'usuarios.csv';

        link.click();

        URL.revokeObjectURL(url);

    }

    editarUsuario(usuario: Usuario): void {

      this.modoEdicion = true;

      this.usuario = {

          nombre: usuario.nombre,

          correo: usuario.correo,

          rol: usuario.rol

      };

      this.usuarioEditandoId =
          usuario.id;

      this.mostrarDialogo = true;

  }

}