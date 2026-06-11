import { Routes } from '@angular/router';

import {
    RassiniLogin,authGuard
} from 'rassini-ui';

import { AppLayoutComponent } from './layout/app-layout/app-layout';

import { DashboardComponent } from './pages/dashboard/dashboard';
import { UsuariosComponent } from './pages/usuarios/usuarios';
import { ConfiguracionComponent } from './pages/configuracion/configuracion';

export const routes: Routes = [

    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },

    {
        path: 'login',
        component: RassiniLogin
    },

    {
        path: '',
        component: AppLayoutComponent,
        children: [

            {
                path: 'dashboard',
                canActivate: [authGuard],
                component: DashboardComponent,

            },

            {
                path: 'usuarios',
                canActivate: [authGuard],
                component: UsuariosComponent
            },
            {
                path: 'configuracion-2',
                canActivate: [authGuard],
                component: ConfiguracionComponent
            },
            {
                path: 'configuracion',
                canActivate: [authGuard],
                component: ConfiguracionComponent
            }

        ]
    },

    {
        path: '**',
        redirectTo: 'login'
    }

];