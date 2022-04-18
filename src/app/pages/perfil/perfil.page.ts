import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TokenService } from 'src/app/services/token.service';
import { EditComponent } from './edit/edit.component';
import { FormCardComponent } from './form-card/form-card.component';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.page.html',
  styleUrls: ['./perfil.page.scss'],
})
export class PerfilPage implements OnInit {
  constructor(
    private modalController: ModalController,
    public token: TokenService
  ) {}

  ngOnInit() {}

  async presentModal() {
    const modal = await this.modalController.create({
      component: EditComponent,
      componentProps: {
        nombre: this.token.getNombre(),
        apellido: this.token.getApellido(),
        dni: this.token.getDni(),
        telefono: this.token.getTelefono(),
        direccion: this.token.getDireccion(),
        correo: this.token.getEmail(),
      },
    });
    await modal.present();
  }
  async pagamePoFavo() {
    const modal = await this.modalController.create({
      component: FormCardComponent,
    });
    await modal.present();
  }
}
