import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { IdentificacionUsuarioComponent } from './identificacion-usuario/identificacion-usuario.component';
import { CambioClaveComponent } from './cambio-clave/cambio-clave.component';
import { RecuperarClaveComponent } from './recuperar-clave/recuperar-clave.component';
import { CerrarSesionComponent } from './cerrar-sesion/cerrar-sesion.component';
import { IdentificacionTwofaComponent } from './identificacion-twofa/identificacion-twofa.component';
import { RegistroPublicoComponent } from './registro-publico/registro-publico.component';
import { ValidarHashUsuarioPublicoComponent } from './validar-hash-usuario-publico/validar-hash-usuario-publico.component';

const routes: Routes = [
  {
    path:'identificar-usuario',
    component: IdentificacionUsuarioComponent
  },
  {
    path: 'cambiar-clave',
    component: CambioClaveComponent
  },
  {
    path:'recuperar-clave',
    component: RecuperarClaveComponent
  },
  {
    path:'2fa',
    component: IdentificacionTwofaComponent
  },
  {
    path:'registro-publico',
    component: RegistroPublicoComponent
  },
  {
    path:'validar-hash-usuario-publico/:hash',
    component: ValidarHashUsuarioPublicoComponent
  },
  
  {
    path: 'cerrar-sesion',
    component: CerrarSesionComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeguridadRoutingModule { }
