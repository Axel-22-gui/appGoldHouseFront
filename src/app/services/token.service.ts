import { Injectable } from '@angular/core';
import { Usuario } from '../models/usuario.interface';

const TOKEN_KEY = 'AuthToken';
const USERNAME_KEY = 'AuthUserName';
const SURNAME_KEY = 'AuthUserSurname';
const DNI_KEY = 'AuthDni';
const TELEPHONE_KEY = 'AuthTelephone';
const ADRESS_KEY = 'AuthDireccion';
const EMAIL_KEY = 'AuthEmail';
const AUTHORITIES_KEY = 'AuthAuthorities';
const ID_KEY = 'AuthIdUser';
const PREMIUM_KEY = 'AuthCuenta';
@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}

  asignarDatos(data: Usuario) {
    this.setUserID(data.userId);
    this.setNombre(data.userNombre);
    this.setApellido(data.userApellido);
    this.setDni(data.userNumeroDoc);
    this.setEmail(data.userCorreo);
    this.setTelefono(data.userTelefono);
    this.setDireccion(data.userdireccion);
    this.setPremiun(data.userCuenta);
  }

  //USUARIO ID
  public setUserID(authorities): void {
    window.sessionStorage.removeItem(ID_KEY);
    window.sessionStorage.setItem(ID_KEY, authorities);
  }
  public getUserID(): string {
    return sessionStorage.getItem(ID_KEY);
  }
  //TOKEN
  public setToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY);
  }
  //NOMBRE
  public setNombre(nombre: string): void {
    window.sessionStorage.removeItem(USERNAME_KEY);
    window.sessionStorage.setItem(USERNAME_KEY, nombre);
  }
  public getNombre(): string {
    return sessionStorage.getItem(USERNAME_KEY);
  }
  //APELLIDO
  public setApellido(nombre: string): void {
    window.sessionStorage.removeItem(SURNAME_KEY);
    window.sessionStorage.setItem(SURNAME_KEY, nombre);
  }
  public getApellido(): string {
    return sessionStorage.getItem(SURNAME_KEY);
  }
  //AUTORIDAD
  public setAuthorities(authorities: string): void {
    window.sessionStorage.removeItem(AUTHORITIES_KEY);
    window.sessionStorage.setItem(AUTHORITIES_KEY, authorities);
  }
  public getAuthorities(): string {
    return sessionStorage.getItem(AUTHORITIES_KEY);
  }
  //DNI
  public setDni(nombre: string): void {
    window.sessionStorage.removeItem(DNI_KEY);
    window.sessionStorage.setItem(DNI_KEY, nombre);
  }
  public getDni(): string {
    return sessionStorage.getItem(DNI_KEY);
  }
  //TELEFONO
  public setTelefono(nombre: string): void {
    window.sessionStorage.removeItem(TELEPHONE_KEY);
    window.sessionStorage.setItem(TELEPHONE_KEY, nombre);
  }
  public getTelefono(): string {
    return sessionStorage.getItem(TELEPHONE_KEY);
  }
  //DIRECCION
  public setDireccion(nombre: string): void {
    window.sessionStorage.removeItem(ADRESS_KEY);
    window.sessionStorage.setItem(ADRESS_KEY, nombre);
  }
  public getDireccion(): string {
    return sessionStorage.getItem(ADRESS_KEY);
  }
  //CORREO
  public setEmail(nombre: string): void {
    window.sessionStorage.removeItem(EMAIL_KEY);
    window.sessionStorage.setItem(EMAIL_KEY, nombre);
  }
  public getEmail(): string {
    return sessionStorage.getItem(EMAIL_KEY);
  }
  //CUENTA

  public setPremiun(nombre) {
    window.sessionStorage.removeItem(PREMIUM_KEY);
    window.sessionStorage.setItem(PREMIUM_KEY, nombre);
  }

  public getPremiun() {
    return sessionStorage.getItem(PREMIUM_KEY);
  }

  //SALIR
  public logout() {
    window.sessionStorage.clear();
  }
}
