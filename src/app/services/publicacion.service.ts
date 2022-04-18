import { Publicacion, VistaSeg } from './../models/publicacion.interface';
import { LoadingService } from './loading.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PublicacionService {
  constructor(private http: HttpClient, private loading: LoadingService) {}
  listarDatos() {
    return this.http.get<Publicacion[]>(environment.rutaApi + 'principal');
  }
  selecccionarPorId(id: number) {
    return this.http.get<Publicacion>(environment.rutaApi + 'principal/' + id);
  }
  guardarPublicacion(publi) {
    return this.http.post<boolean>(environment.rutaApi + 'compras', publi);
  }
  filtrado(publicacion) {
    return this.http.post<Publicacion[]>(
      environment.rutaApi + 'principal',
      publicacion
    );
  }
  misPublicaciones(id) {
    return this.http.get<VistaSeg>(
      environment.rutaApi + 'principal/publiusuario/' + id
    );
  }
}
