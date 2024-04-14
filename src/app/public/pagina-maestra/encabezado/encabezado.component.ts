import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuLateralComponent } from '../menu-lateral/menu-lateral.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { UsuarioValidadoModel } from '../../../../modelos/usuario.validado.model';

@Component({
  selector: 'app-encabezado',
  standalone: true,
  imports: [CommonModule, MenuLateralComponent, RouterLink, RouterOutlet],
  templateUrl: './encabezado.component.html',
  styleUrl: './encabezado.component.css'
})
export class EncabezadoComponent {
   
constructor(private servicioSeguridad: SeguridadService) { }

  sesionActiva: boolean = false;

  ngOnInit() {
    this.ValidarSesion();
  }

  ValidarSesion(){
    this.servicioSeguridad.ObtenerDatosSesion().subscribe({
      next: (datos:UsuarioValidadoModel)=>{
        if(datos.token!= ""){
          this.sesionActiva = true;
        }
        else{
          this.sesionActiva = false;
        }
      },
      error: (err:any)=>{ console.log(err) }
    })  }
}
