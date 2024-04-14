import { Component } from '@angular/core';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cerrar-sesion',
  templateUrl: './cerrar-sesion.component.html',
  styleUrl: './cerrar-sesion.component.css'
})

export class CerrarSesionComponent {
  ngOnInit(){
    this.cerrarSesion();
    
  }
  constructor(private servicioSeguridad: SeguridadService, private router: Router) { }


  cerrarSesion(){
    
    this.servicioSeguridad.RemoverDatosusuarioValidado()
    this.router.navigate([""]);
  }
}
