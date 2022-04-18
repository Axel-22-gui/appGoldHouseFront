import { LoadingService } from './../../../services/loading.service';
import { ToastService } from './../../../services/toast.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { OfertasService } from 'src/app/services/ofertas.service';

@Component({
  selector: 'app-publica',
  templateUrl: './publica.component.html',
  styleUrls: ['./publica.component.scss'],
})
export class PublicaComponent implements OnInit {
  ofertas: any;
  constructor(
    private modalCtlr: ModalController,
    private navParams: NavParams,
    private ofertasSvc: OfertasService,
    private toast: ToastService,
    private loading: LoadingService
  ) {
    this.ofertasSvc
      .ofertasPendientes(this.navParams.get('id'))
      .subscribe((data) => {
        if (data[0].ofIdoferta !== 0) {
          this.ofertas = data;
        }
        console.log(data);
      });
  }

  ngOnInit() {}
  aceptarOferta(id) {
    this.loading.presentLoading('Enviando petición...');
    this.ofertasSvc.aceptar(id).subscribe(
      (data) => {
        this.toast.presentToast('Operación realizada', 'success', 'top', 1000);
        this.loading.closeLoading();
        this.closeModal();
      },
      (err) => {
        this.loading.closeLoading();
        console.log(err);
      }
    );
  }
  rechazarOferta(id) {
    this.loading.presentLoading('Enviando petición...');
    this.ofertasSvc.rechazar(id, 'Oferta rechazada').subscribe(
      (data) => {
        this.toast.presentToast('Operación realizada', 'success', 'top', 1000);
        this.loading.closeLoading();
      },
      (err) => {
        this.loading.closeLoading();
        console.log(err);
      }
    );
  }
  closeModal() {
    this.modalCtlr.dismiss();
  }
}
