import { Routes } from '@angular/router';
import { InicioComponent } from './public/inicio/inicio.component';
import { RutaNoEncontradaComponent } from './public/errores/ruta-no-encontrada/ruta-no-encontrada.component';

export const routes: Routes = [
    {
        path:"inicio",
        component: InicioComponent

    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/inicio'
    },
    {
        path: 'seguridad',
        loadChildren: ()=> import("./modulos/seguridad/seguridad.module").then(modulo => modulo.SeguridadModule)
    },
    {
        path: 'parametros',
        loadChildren: ()=> import("./modulos/parametros/parametros.module").then(modulo => modulo.ParametrosModule)
    },
    {
        path: 'ventas',
        loadChildren: ()=> import("./modulos/ventas/ventas.module").then(modulo => modulo.VentasModule)
    },
    {
        path: 'reportes',
        loadChildren: ()=> import("./modulos/reportes/reportes.module").then(modulo => modulo.ReportesModule)
    },
    
    {
        path: '**',
        component: RutaNoEncontradaComponent
    }
];
