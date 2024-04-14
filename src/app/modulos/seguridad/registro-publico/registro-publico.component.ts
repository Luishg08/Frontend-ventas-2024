import { Component } from '@angular/core';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioModel } from '../../../../modelos/usuario.model';

@Component({
  selector: 'app-registro-publico',
  templateUrl: './registro-publico.component.html',
  styleUrl: './registro-publico.component.css'
})
export class RegistroPublicoComponent {
  fGroup: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder,
    private servicioSeguridad: SeguridadService,
  ) {}

  ngOnInit() {
    this.construirFormulario();

  }

  construirFormulario() {
    this.fGroup = this.fb.group({
      primerNombre: ['',[Validators.required,Validators.minLength(2)]],
      segundoNombre: ['',[Validators.required,Validators.minLength(2)]],
      primerApellido: ['',[Validators.required,Validators.minLength(2)]],
      segundoApellido: ['',[Validators.required,Validators.minLength(2)]],
      correo: ['', [Validators.required, Validators.email]],
      celular: ['',[Validators.required,Validators.minLength(12)]]
    })
  }

  Registrarse(){
    let campos = this.ObtenerFormGroup
    let datos = {
      primerNombre: campos['primerNombre'].value,
      segundoNombre: campos['segundoNombre'].value,
      primerApellido: campos['primerApellido'].value,
      segundoApellido: campos['segundoApellido'].value,
      correo: campos['correo'].value,
      celular: campos['celular'].value
    }
    this.servicioSeguridad.RegistrarUsuarioPublico(datos).subscribe({
      next:(respuesta:UsuarioModel)=> {
        alert('Registro correcto, se ha enviado un mensaje para validar su dirección de correo')
      },
      error:(err)=>{
        alert('Ha ocurrido un error al registrar el usuario')
      }
    })
  }

 get ObtenerFormGroup(){
    return this.fGroup.controls;
  }
}
