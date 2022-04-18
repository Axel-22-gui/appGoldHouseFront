import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModalController, NavParams } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';
import { PublicacionService } from 'src/app/services/publicacion.service';
import { Publicacion } from 'src/app/models/publicacion.interface';
import { OfertasService } from 'src/app/services/ofertas.service';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-detalle-vivi',
  templateUrl: './detalle-vivi.component.html',
  styleUrls: ['./detalle-vivi.component.scss'],
})
export class DetalleViviComponent implements OnInit {
  respuesta: Publicacion;
  slideOpts = {
    efect: 'cards',
    grabCursor: true,
    speed: 400,
  };
  monto: FormGroup;
  showMonto = false;
  latLng: any;
  constructor(
    private modal: ModalController,
    private navPar: NavParams,
    private publiSvc: PublicacionService,
    private ofertaSvc: OfertasService,
    private token: TokenService,
    private fb: FormBuilder
  ) {
    this.publiSvc.selecccionarPorId(this.navPar.get('id')).subscribe(
      (data) => {
        this.respuesta = data;
        console.log(data);
        this.latLng = {
          lat: this.respuesta.publilatitud,
          long: this.respuesta.publilongitud,
        };
      },
      (err) => console.log(err)
    );
    this.monto = this.fb.group({
      ofmonto: ['', Validators.required],
      ofidpublicacion: [this.navPar.get('id')],
      ofidusuario: [this.token.getUserID()],
    });
  }
  returnImg(byte): string {
    return 'data:image/jpeg;base64,' + byte;
  }
  ngOnInit() {}
  ofertar() {
    this.showMonto = !this.showMonto;
  }
  sendOferta() {
    this.ofertaSvc.ofertar(this.monto.value);
    this.cerrarModal();
  }
  cerrarModal() {
    this.modal.dismiss();
  }
}
