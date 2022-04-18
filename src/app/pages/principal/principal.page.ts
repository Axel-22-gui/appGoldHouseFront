import { Publicacion } from '../../models/publicacion.interface';
import { PublicacionService } from './../../services/publicacion.service';
import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { DetalleViviComponent } from './detalle-vivi/detalle-vivi.component';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.page.html',
  styleUrls: ['./principal.page.scss'],
})
export class PrincipalPage implements OnInit {
  slideOpts = {
    efect: 'cards',
    grabCursor: true,
    speed: 400,
  };
  publis: Publicacion[] = [];
  favoritos: Publicacion[];
  publisShow: Publicacion[] = [];
  filterForm: FormGroup;
  constructor(
    private modalController: ModalController,
    private publicacionSvc: PublicacionService,
    private fb: FormBuilder
  ) {
    this.publicacionSvc.listarDatos().subscribe(async (data) => {
      this.publisShow = data;
      this.publis = [];
      this.publis = this.publisShow;
      this.favoritos = await data.filter((element) => element.publifavoritos);
    });
    this.filterForm = this.fb.group({
      publiDescripcion: [''],
      publiProvincia: [''],
      publicantBanios: [0],
      publicantCuarto: [0],
      publipiscina: [0],
      publipet: [0],
      publifechaentera: [0],
      publicochera: [0],
      publiMaximoPrecio: [0],
      publiMinimoPrecio: [0],
      publiMaximaArea: [0],
      publiMinimaArea: [0],
    });
  }

  ngOnInit() {}
  async presentModal(id) {
    const modal = await this.modalController.create({
      component: DetalleViviComponent,
      componentProps: { id },
    });
    return await modal.present();
  }

  todos() {
    this.publis = this.publisShow;
  }
  ventas() {
    this.publis = [];
    console.log(this.publisShow);
    this.publis = this.publisShow.filter(
      (element) => element.publitipo === 'Venta'
    );
  }
  alquil() {
    this.publis = [];
    this.publis = this.publisShow.filter(
      (element) => element.publitipo === 'Alquiler'
    );
  }
  filtros() {
    console.log(this.filterForm.value);
    this.publicacionSvc
      .filtrado(this.filterForm.value)
      .subscribe((data) => console.log(data));
  }
  returnImg(byte): string {
    return 'data:image/jpeg;base64,' + byte;
  }
}
