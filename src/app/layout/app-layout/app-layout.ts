import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';

import {
    Auth,
    RassiniShell
} from 'rassini-ui';

@Component({
    selector: 'app-app-layout',
    standalone: true,
    imports: [
        RouterOutlet,
        RassiniShell
    ],
    templateUrl: './app-layout.html',
    styleUrl: './app-layout.scss'
})
export class AppLayoutComponent {

    constructor(
        private readonly auth: Auth,
        private readonly router: Router
    ) {}

    logout(): void {

        this.auth.logout();

        this.router.navigate([
            '/login'
        ]);

    }

    menu = [

        {
            label: 'General',

            items: [

                {
                    label: 'Dashboard',
                    icon: 'pi pi-home',
                    routerLink: '/dashboard'
                },

                {
                    label: 'Usuarios',
                    icon: 'pi pi-users',
                    routerLink: '/usuarios'
                },

                {
                    label: 'Otra Configuracion',
                    icon: 'pi pi-cog',
                    routerLink: '/configuracion-2'
                },

                {
                    label: 'Configuración',
                    icon: 'pi pi-cog',
                    routerLink: '/configuracion'
                }

            ]

        }

    ];

}