import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink, RouterOutlet } from '@angular/router';
import { get } from 'http';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { error } from 'console';
import { UsuarioModel } from '../../../../modelos/usuario.model';

@Component({
  selector: 'app-recuperar-clave',
  templateUrl: './recuperar-clave.component.html',
  styleUrl: './recuperar-clave.component.css'
})
export class RecuperarClaveComponent {
 fGroup: FormGroup = new FormGroup({});
 
  constructor(private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
  ) {}
 ngOnInit() {
  this.fGroup = this.fb.group({
    usuario: ['',[Validators.required, Validators.email]],
  })
 }

 RecuperarClave(){
    if(this.fGroup.invalid){
      alert('Debe ingresar los datos del usuario')
    }else{
      let usuario = this.ObtenerFGroup['usuario'].value;
      this.servicioSeguridad.RecuperarClavePorUsuario(usuario).subscribe({
        next:(datos:UsuarioModel)=>{
          alert('Se ha enviado una nueva contraseña como mensaje de texto al número '+datos.celular)
        },
        error:(err)=>{
          alert('Ha ocurrido un error al recuperar la contraseña')
        }
      })
    }
 }

 get ObtenerFGroup(){
    return this.fGroup.controls;
 }
}