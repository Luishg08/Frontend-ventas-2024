import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { UsuarioModel } from '../../modelos/usuario.model';
import { HttpClient } from '@angular/common/http';
import { ConfiguracionRutasBackend } from '../../config/configuracion.rutas.backend';
import { AsyncLocalStorage } from 'node:async_hooks';
import { UsuarioValidadoModel } from '../../modelos/usuario.validado.model';
import { log } from 'node:console';


@Injectable({
  providedIn: 'root'
})
export class SeguridadService {
  urlBase: string = ConfiguracionRutasBackend.urlSeguridad;
  constructor(private http: HttpClient) {
    this.ValidacionDeSesion();
   }

  /**
   * Identificar usuario
   * @param usuario 
   * @param clave 
   * @returns datos del usuario validado
   */
  IdentificarUsuario(usuario: string, clave: string): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>(`${this.urlBase}identificar-usuario`, {
      correo: usuario,
      clave: clave
    });
  }
  /**
   * Almacenar datos del usuario identificado
   * @param datos
   * @returns true si se almacena, false si ya existe
   */
  AlmacenarDatosUsuarioIdentificado(datos: UsuarioModel): boolean {
    let cadena = JSON.stringify(datos);
    let datosLS = localStorage.getItem("datos-usuario")
    if (datosLS) {
      localStorage.removeItem("datos-usuario");
    }
    localStorage.setItem("datos-usuario", cadena);
    return true;
  }

  /**
   * Busca los datos de local storage del usuario identificado
   * @returns datos del usuario identificado
   */
  ObtenerDatosUsuarioIdentificado(): UsuarioModel | null {
    let datosLS = localStorage.getItem("datos-usuario");
    if (datosLS) {
      return JSON.parse(datosLS);
    } else {
      return null;
    }
  }

  /**
   * Valdar código 2FA
   * @param idUsuario
   * @param codigo
   * @returns objeto con el resultado de la validación
   */
  ValidarCodigo2FA(idUsuario: string, codigo: string): Observable<UsuarioValidadoModel> {
    return this.http.post<UsuarioValidadoModel>(`${this.urlBase}verificar-2fa`, {
      usuarioId: idUsuario,
      codigo2fa: codigo
    });
  }

  RegistrarUsuarioPublico(datos: any): Observable<UsuarioModel> {
    return this.http.post<UsuarioModel>(`${this.urlBase}usuario-publico`, datos)
  }

  ValidarHashUsuarioPublico(hash: string): Observable<boolean> {
    return this.http.post<boolean>(`${this.urlBase}validar-hash-usuario-publico`,{
      codigoHash:hash
    })
  }

  /**
   * Guarda en local storage los datos del usuario validado
   * @param datos  datos del usuario validado
   * @returns true
   */
  AlmacenarDatosUsuarioValidado(datos:UsuarioValidadoModel):boolean{
    let datosLS = localStorage.getItem("datos-sesion");
    if(datosLS){
      localStorage.removeItem("datos-sesion");
    }
    let datosString = JSON.stringify(datos);
    localStorage.setItem("datos-sesion",datosString);
    this.ActualizarComportamientoUsuario(datos);

    return true;
  }

  /**
   * Elimina los datos del usuario validado para cerrar la sesión
   */
  RemoverDatosusuarioValidado(){
    let datosToken = localStorage.getItem("datos-sesion");
    if(datosToken){
      localStorage.removeItem("datos-sesion");
    }
    let datosUsuario= localStorage.getItem("datos-usuario");
    if(datosUsuario){
      localStorage.removeItem("datos-usuario");
    }
    this.ActualizarComportamientoUsuario(new UsuarioValidadoModel())
    
  }

  RecuperarClavePorUsuario(usuario:string):Observable<UsuarioModel>{
    return this.http.post<UsuarioModel>(`${this.urlBase}recuperar-clave`,{
      correo:usuario
    })
  }


  /* Administración de la sesion del usuario */

  datosUsuarioValidado = new BehaviorSubject<UsuarioValidadoModel>(new UsuarioValidadoModel());

  ObtenerDatosSesion():Observable<UsuarioValidadoModel>{
    return this.datosUsuarioValidado.asObservable()
  }

ValidacionDeSesion(){
    let datosLS = localStorage.getItem("datos-sesion");
    if(datosLS){
      let usuarioObject = JSON.parse(datosLS);
      this.ActualizarComportamientoUsuario(usuarioObject);
  }
}

ActualizarComportamientoUsuario(datos: UsuarioValidadoModel){
  return this.datosUsuarioValidado.next(datos)
}
  }