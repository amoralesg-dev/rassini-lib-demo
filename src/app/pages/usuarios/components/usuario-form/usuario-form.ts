import {
    Component,
    EventEmitter,
    Input,
    Output
} from '@angular/core';

import { FormsModule } from '@angular/forms';

import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { SelectModule } from 'primeng/select';

@Component({
    selector: 'app-usuario-form',
    standalone: true,
    imports: [
        FormsModule,
        ButtonModule,
        InputTextModule,
        SelectModule
    ],
    templateUrl: './usuario-form.html',
    styleUrl: './usuario-form.scss'
})
export class UsuarioFormComponent {

    @Input()
    usuario = {
        nombre: '',
        correo: '',
        rol: 'USER'
    };

    @Output()
    guardar = new EventEmitter<any>();

    @Output()
    cancelar = new EventEmitter<void>();

    roles = [

        {
            label: 'ADMIN',
            value: 'ADMIN'
        },

        {
            label: 'USER',
            value: 'USER'
        }

    ];

    onGuardar(): void {

        this.guardar.emit(
            this.usuario
        );

    }

    onCancelar(): void {

        this.cancelar.emit();

    }

}