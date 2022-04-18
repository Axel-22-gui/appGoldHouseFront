import { ToastService } from 'src/app/services/toast.service';
import { LoadingService } from './loading.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Ofertas } from '../models/Ofertas.interface';

@Injectable({
  providedIn: 'root',
})
export class OfertasService {
  constructor(
    private http: HttpClient,
    private loading: LoadingService,
    private toast: ToastService
  ) {}
  ofertar(oferta) {
    this.loading.presentLoading('Subiendo Oferta...');
    this.http.post<boolean>(`${environment.rutaApi}oferta`, oferta).subscribe(
      (data) => {
        if (data) {
          this.toast.presentToast(
            'Oferta registrada correctamente',
            'success',
            'top',
            1000
          );
          this.loading.closeLoading();
        } else {
          this.toast.presentToast(
            'Oferta no registrada',
            'danger',
            'top',
            1000
          );
          this.loading.closeLoading();
        }
      },
      (err) => {
        console.log(err);
        this.loading.closeLoading();
      }
    );
  }
  ofertasPendientes(id) {
    return this.http.get<Ofertas[]>(
      `${environment.rutaApi}oferta/pendiente/${id}`
    );
  }
  aceptar(id) {
    return this.http.get<boolean>(`${environment.rutaApi}oferta/aceptar/${id}`);
  }
  rechazar(id, mensaje) {
    return this.http.post<boolean>(`${environment.rutaApi}oferta/rechazar`, {
      mofertaid: id,
      mofertasmensaje: mensaje,
    });
  }
}
