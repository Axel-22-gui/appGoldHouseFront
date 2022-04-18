import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AlquilaPropComponent } from './alquila-prop/alquila-prop.component';
import { VendePropComponent } from './vende-prop/vende-prop.component';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.page.html',
  styleUrls: ['./compras.page.scss'],
})
export class ComprasPage implements OnInit {
  constructor(private modalController: ModalController) {}

  ngOnInit() {}
  async presentModalVende() {
    const modal = await this.modalController.create({
      component: VendePropComponent,
    });
    return await modal.present();
  }
  async presentModalAlquila() {
    const modal = await this.modalController.create({
      component: AlquilaPropComponent,
    });
    return await modal.present();
  }
}
