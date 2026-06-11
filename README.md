# Rassini UI



Biblioteca corporativa para Angular 19 basada en PrimeNG que proporciona componentes reutilizables, layout corporativo, autenticación, tablas, diálogos, notificaciones y servicios compartidos.

---

# Objetivos

* Estandarizar la experiencia visual de aplicaciones Rassini.
* Reducir código repetitivo.
* Centralizar configuraciones de PrimeNG.
* Proporcionar componentes corporativos reutilizables.
* Simplificar el desarrollo de nuevos portales.

---

# Instalación

## Instalar paquete

```bash
npm install rassini-ui
```

---

# Configuración Global

## app.config.ts

```ts
import {
    ApplicationConfig
} from '@angular/core';

import {
    provideRouter
} from '@angular/router';

import {
    provideRassiniTheme
} from 'rassini-ui';

import {
    routes
} from './app.routes';

export const appConfig: ApplicationConfig = {

    providers: [

        provideRouter(routes),

        provideRassiniTheme()

    ]

};
```

---

# ¿Qué configura automáticamente?

La función:

```ts
provideRassiniTheme()
```

configura automáticamente:

* PrimeNG
* Tema corporativo Rassini
* Prime Icons
* Favicon corporativo
* MessageService
* ConfirmationService
* Estilos globales corporativos

No es necesario registrar servicios adicionales.

---

# Layout Corporativo

## RassiniShell

Componente principal de la aplicación.

### Uso

```html
<rui-shell
    [menu]="menu">

    <router-outlet>
    </router-outlet>

</rui-shell>
```

### Funcionalidades

* Sidebar corporativo
* Topbar corporativo
* Responsive
* Menú dinámico
* Logout
* Overlay móvil

---

## RassiniTopbar

```html
<rui-topbar>
</rui-topbar>
```

### Eventos

```ts
(menuToggle)

(logout)
```

---

## RassiniSidebar

```html
<rui-sidebar
    [menu]="menu">
</rui-sidebar>
```

### Modelo

```ts
export interface RassiniMenuItem {

    label: string;

    icon?: string;

    routerLink?: string | string[];

    items?: RassiniMenuItem[];

}
```

### Ejemplo

```ts
menu = [

    {
        label: 'Usuarios',
        icon: 'pi pi-users',
        routerLink: '/usuarios'
    },

    {
        label: 'Pagos',
        icon: 'pi pi-money-bill',
        routerLink: '/pagos'
    }

];
```

---

# Componentes de Página

## PageHeader

```html
<app-page-header
    title="Usuarios"
    subtitle="Administración de usuarios">
</app-page-header>
```

---

## PageToolbar

```html
<app-page-toolbar>

    <p-button
        label="Nuevo">
    </p-button>

</app-page-toolbar>
```

---

## PageContent

```html
<app-page-content>

    contenido

</app-page-content>
```

---

# DataTable

Componente reutilizable para tablas corporativas.

---

## Uso Básico

```html
<app-data-table
    [columns]="columns"
    [data]="usuarios">
</app-data-table>
```

---

## Definición de Columnas

```ts
columns = [

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
        header: 'Correo'
    }

];
```

---

## Selección Múltiple

```html
<app-data-table
    [columns]="columns"
    [data]="usuarios"
    (rowsSelected)="onSelectionChange($event)">
</app-data-table>
```

```ts
onSelectionChange(rows: any[]): void {

    this.selectedRows = rows;

}
```

---

## Acciones Personalizadas

```html
<app-data-table
    [columns]="columns"
    [data]="usuarios">

    <ng-template
        #actions
        let-row>

        <p-button
            icon="pi pi-pencil">
        </p-button>

        <p-button
            icon="pi pi-trash">
        </p-button>

    </ng-template>

</app-data-table>
```

---

# Dialog

## AppDialog

Componente corporativo para ventanas modales.

### Uso

```html
<app-app-dialog
    [(visible)]="visible"
    title="Nuevo Usuario">

    contenido

</app-app-dialog>
```

### Propiedades

| Propiedad | Descripción     |
| --------- | --------------- |
| visible   | Mostrar/Ocultar |
| title     | Título          |
| width     | Ancho           |

---

# Toast

## Componente

Debe agregarse una vez por pantalla:

```html
<app-app-toast>
</app-app-toast>
```

---

## Servicio

```ts
import {
    Toast
} from 'rassini-ui';
```

### Constructor

```ts
constructor(
    private readonly toast: Toast
) {}
```

### Success

```ts
this.toast.success(
    'Proceso realizado correctamente'
);
```

### Error

```ts
this.toast.error(
    'Ocurrió un error'
);
```

### Warning

```ts
this.toast.warn(
    'Advertencia'
);
```

### Info

```ts
this.toast.info(
    'Información'
);
```

---

# Confirm Dialog

## Componente

Debe agregarse una vez por pantalla:

```html
<app-app-confirm-dialog>
</app-app-confirm-dialog>
```

---

## Servicio

```ts
import {
    Dialog
} from 'rassini-ui';
```

### Constructor

```ts
constructor(
    private readonly dialog: Dialog
) {}
```

### Ejemplo

```ts
this.dialog.confirm({

    header: 'Eliminar Usuario',

    message:
        '¿Desea eliminar el registro?',

    accept: () => {

        console.log('Confirmado');

    }

});
```

---

# Loader Global

## Componente

Agregar una sola vez en la aplicación.

```html
<app-app-loader>
</app-app-loader>
```

---

## Servicio

```ts
import {
    Loader
} from 'rassini-ui';
```

### Constructor

```ts
constructor(
    private readonly loader: Loader
) {}
```

### Mostrar

```ts
this.loader.show();
```

### Ocultar

```ts
this.loader.hide();
```

---

# Login Corporativo

## RassiniLogin

```html
<rui-login
    (loginEvent)="onLogin($event)">
</rui-login>
```

### Evento

```ts
{
    username: string;
    password: string;
}
```

---

# Autenticación

## Auth Service

```ts
import {
    Auth
} from 'rassini-ui';
```

### Login

```ts
this.auth.login(
    username,
    password
);
```

### Logout

```ts
this.auth.logout();
```

### Validar Sesión

```ts
this.auth.isAuthenticated();
```

---

# Auth Guard

## Configuración

```ts
import {
    authGuard
} from 'rassini-ui';
```

```ts
{
    path: '',
    canActivate: [
        authGuard
    ],
    children: [...]
}
```

---

# Componentes Disponibles

| Componente           | Descripción          |
| -------------------- | -------------------- |
| RassiniShell         | Layout principal     |
| RassiniTopbar        | Barra superior       |
| RassiniSidebar       | Menú lateral         |
| PageHeaderComponent  | Encabezado           |
| PageToolbarComponent | Barra de acciones    |
| PageContentComponent | Contenedor principal |
| DataTable            | Tabla corporativa    |
| AppDialog            | Modal corporativo    |
| AppToast             | Notificaciones       |
| AppConfirmDialog     | Confirmaciones       |
| AppLoader            | Loader global        |
| RassiniLogin         | Login corporativo    |

---

# Servicios Disponibles

| Servicio | Descripción       |
| -------- | ----------------- |
| Auth     | Gestión de sesión |
| Toast    | Notificaciones    |
| Dialog   | Confirmaciones    |
| Loader   | Indicador global  |

---

# Arquitectura Recomendada

```text
Aplicación
│
├── provideRassiniTheme()
│
├── RassiniShell
│
├── AuthGuard
│
├── Auth
│
├── DataTable
│
├── Dialog
│
├── Toast
│
└── Loader
```

---

# Buenas Prácticas

* Utilizar siempre los wrappers corporativos.
* Evitar dependencias directas a PrimeNG en los módulos de negocio.
* Centralizar estilos en la librería.
* Reutilizar DataTable para todos los catálogos.
* Utilizar Toast para notificaciones al usuario.
* Utilizar Dialog para operaciones destructivas.
* Utilizar Loader para procesos asíncronos largos.
* Proteger rutas mediante AuthGuard.

---

# Versión

Rassini UI v1.0

Biblioteca corporativa para el desarrollo de aplicaciones Angular dentro de Rassini.
