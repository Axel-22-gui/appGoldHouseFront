import { Usuario } from './../models/usuario.interface';
import { LoadingService } from './loading.service';
import { TipoDocumento } from '../models/tipoDocumento.interface';
import { ToastService } from './toast.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private router: Router,
    private token: TokenService,
    private toast: ToastService,
    private loading: LoadingService
  ) {}
  async login(usuario) {
    this.loading.presentLoading('Autenticando...');
    this.http.post<Usuario>(environment.rutaApi + 'login', usuario).subscribe(
      (data) => {
        if (data.userId !== 0) {
          console.log(data);
          this.token.asignarDatos(data);
          this.toast.presentToast(
            'Bienvenido usuario ' + data.userNombre,
            'success',
            'bottom',
            1500
          );
          this.loading.closeLoading();
          this.router.navigate(['/general']);
        } else {
          this.toast.presentToast(
            'Credenciales inválidas',
            'danger',
            'top',
            1500
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
  async register(usuario) {
    this.loading.presentLoading('Registrando...');
    this.http
      .post<Usuario>(environment.rutaApi + 'registro', usuario)
      .subscribe(
        (data) => {
          if (data) {
            this.loading.closeLoading();
            this.router.navigate(['/compras']);
          }
        },
        (err) => {
          console.log(err);
          this.loading.closeLoading();
        }
      );
  }
  editarDatos(usuario) {
    this.loading.presentLoading('Editando Datos...');
    this.http
      .put<boolean>(
        environment.rutaApi + 'perfil/' + this.token.getUserID(),
        usuario
      )
      .subscribe(
        (data) => {
          if (data) {
            this.toast.presentToast(
              'Datos editados correctamente',
              'success',
              'top',
              1000
            );
            this.loading.closeLoading();
          }
        },
        (err) => this.loading.closeLoading()
      );
  }
  traerTiposDoc() {
    return this.http.get<TipoDocumento>(environment.rutaApi + 'registro');
  }
}
