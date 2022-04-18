import { Seguimiento } from './../models/seguimiento.interface';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SeguimientoService {
  constructor(private http: HttpClient) {}

  public ingresarIncidencia(message) {
    return this.http.post<boolean>(
      `${environment.rutaApi}seguimiento/incidencia`,
      message
    );
  }
  public listarIncidencia(id) {
    return this.http.get<Seguimiento[]>(
      `${environment.rutaApi}seguimiento/listar/${id}`
    );
  }
  public ingresarRespuesta(req) {
    return this.http.post<boolean>(
      `${environment.rutaApi}seguimiento/respuesta`,
      req
    );
  }
}
