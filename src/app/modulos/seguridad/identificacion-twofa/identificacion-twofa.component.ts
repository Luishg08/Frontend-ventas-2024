import { Component } from '@angular/core';
import { SeguridadService } from '../../../servicios/seguridad.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router} from '@angular/router';
import { UsuarioValidadoModel } from '../../../../modelos/usuario.validado.model';

@Component({
  selector: 'app-identificacion-twofa',
  templateUrl: './identificacion-twofa.component.html',
  styleUrl: './identificacion-twofa.component.css'
})
export class IdentificacionTwofaComponent {

  usuarioId: string = "";
  fGroup: FormGroup = new FormGroup({});

  constructor(private servicioSeguridad: SeguridadService,
    private fb: FormBuilder,
    private router: Router
  ) {

  }

  ngOnInit() {
    let datos = this.servicioSeguridad.ObtenerDatosUsuarioIdentificado();
    if (datos != null) {
      this.ConstruirFormulario()
      this.usuarioId = datos._id!;
    } else {
      this.router.navigate(['/seguridad/identificar-usuario'])
    }
  }

  ConstruirFormulario() {
    this.fGroup = this.fb.group({
      codigo: ['', [Validators.required]]
    })
  }

  ValidarCodigo2fa() {
    if (this.fGroup.invalid) {
      alert("Debe ingresar el código 2FA")
    } else {
      let codigo2fa = this.obtenerFGroup['codigo'].value;
      this.servicioSeguridad.ValidarCodigo2FA(this.usuarioId, codigo2fa).subscribe({
        next: (data: UsuarioValidadoModel) => {
          console.log(data);
          this.servicioSeguridad.AlmacenarDatosUsuarioValidado(data)
          this.router.navigate([""])

        },
        error: (error: any) => {
          console.log(error);
        }
      })
    }
  }

  get obtenerFGroup() {
    return this.fGroup.controls;
  }
}
