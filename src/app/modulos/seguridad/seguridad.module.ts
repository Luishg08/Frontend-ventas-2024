import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SeguridadRoutingModule } from './seguridad-routing.module';
import { IdentificacionTwofaComponent } from './identificacion-twofa/identificacion-twofa.component';
import { IdentificacionUsuarioComponent } from './identificacion-usuario/identificacion-usuario.component';
import { CambioClaveComponent } from './cambio-clave/cambio-clave.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistroPublicoComponent } from './registro-publico/registro-publico.component';
import { ValidarHashUsuarioPublicoComponent } from './validar-hash-usuario-publico/validar-hash-usuario-publico.component';

@NgModule({
  declarations: [
    IdentificacionTwofaComponent,
    IdentificacionUsuarioComponent,
    CambioClaveComponent,
    RecuperarClaveComponent,
    CerrarSesionComponent,
    RegistroPublicoComponent,
    ValidarHashUsuarioPublicoComponent
  ],
  imports: [
    CommonModule,
    SeguridadRoutingModule, 
    RouterOutlet, 
    RouterLink, 
    ReactiveFormsModule, 
    FormsModule
  ]
})
export class SeguridadModule { }


