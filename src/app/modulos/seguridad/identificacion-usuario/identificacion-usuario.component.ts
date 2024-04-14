import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { UsuarioModel } from '../../../../modelos/usuario.model';
import {MD5} from 'crypto-js';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-identificacion-usuario',
  templateUrl: './identificacion-usuario.component.html',
  standalone: false,
  styleUrl: './identificacion-usuario.component.css'
})
export class IdentificacionUsuarioComponent {
  fGroup: FormGroup = new FormGroup({});
  constructor(private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
    private router: Router
  ) {
   }

  ngOnInit(){
    this.ConstruirFormulario();
  }
   ConstruirFormulario(){
   this.fGroup = this.fb.group({
    usuario: ['',[Validators.required, Validators.email]],
    clave: ['',[Validators.required]]
   })
  }

  identificarUsuario(){
    if (this.fGroup.invalid){
      alert('Formulario invalido');
    }else{
      let usuario = this.obtenerFormGroup['usuario'].value
      let clave = this.obtenerFormGroup['clave'].value
      let claveEncriptada = MD5(clave).toString();
      this.servicioSeguridad.IdentificarUsuario(usuario,claveEncriptada).subscribe({
        next: (data:UsuarioModel) =>{
          if(data._id == undefined || data._id == null){
            alert('Credenciales incorrectas o falta la validación del correo electrónico')
          }else{

          console.log(data);
          if(this.servicioSeguridad.AlmacenarDatosUsuarioIdentificado(data)){
            this.router.navigate(['/seguridad/2fa'])
          }
        }
          
        },
        error: (error:any) =>{
          console.log(error);
        }
      })
    
    }
    
  }

  get obtenerFormGroup(){
    return this.fGroup.controls;
  }
}
