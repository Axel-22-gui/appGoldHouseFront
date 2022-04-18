import { EnCursoComponent } from './en-curso/en-curso.component';
import { LoadingService } from './../../services/loading.service';
import { VistaSeg } from './../../models/publicacion.interface';
import { PublicacionService } from './../../services/publicacion.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TokenService } from 'src/app/services/token.service';
import { ComprasComponent } from './compras/compras.component';
import { PublicaComponent } from './publica/publica.component';

@Component({
  selector: 'app-seguimiento',
  templateUrl: './seguimiento.page.html',
  styleUrls: ['./seguimiento.page.scss'],
})
export class SeguimientoPage implements OnInit {
  slideOpts = {
    efect: 'cards',
    grabCursor: true,
    speed: 400,
  };
  misPubs: VistaSeg;

  constructor(
    private modalCtlr: ModalController,
    private token: TokenService,
    private publicSvc: PublicacionService,
    private loading: LoadingService
  ) {
    this.loading.presentLoading('Cargando Datos...');
    this.obtenerData();
  }

  async obtenerData() {
    await this.publicSvc.misPublicaciones(this.token.getUserID()).subscribe(
      (data) => {
        this.misPubs = data;
        console.log(data);
        this.loading.closeLoading();
      },
      (err) => {
        console.log(err);
        this.loading.closeLoading();
      }
    );
  }

  ngOnInit() {}
  async presentModalCompras(id) {
    const modal = await this.modalCtlr.create({
      component: ComprasComponent,
      componentProps: { id },
    });
    await modal.present();
  }
  async presentModalPubli(id) {
    const modal = await this.modalCtlr.create({
      component: PublicaComponent,
      componentProps: { id },
    });
    await modal.present();
  }
  async presentModalProceso(id) {
    const modal = await this.modalCtlr.create({
      component: EnCursoComponent,
      componentProps: { id },
    });
    await modal.present();
  }
  returnImg(byte): string {
    return 'data:image/jpeg;base64,' + byte;
  }
}
