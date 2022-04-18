import { LoadingService } from './../../../services/loading.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Camera, CameraResultType } from '@capacitor/camera';
import { ModalController } from '@ionic/angular';

import { PublicacionService } from 'src/app/services/publicacion.service';
import { ToastService } from 'src/app/services/toast.service';
import { TokenService } from 'src/app/services/token.service';
import { DetallesCasa } from 'src/app/models/detallesCasa.interface';
import {
  ArchivoRequest,
  Publicacion,
} from 'src/app/models/publicacion.interface';
import { GoogleMapsService } from 'src/app/services/google-maps.service';

@Component({
  selector: 'app-alquila-prop',
  templateUrl: './alquila-prop.component.html',
  styleUrls: ['./alquila-prop.component.scss'],
})
export class AlquilaPropComponent implements OnInit {
  public inputsDetalleCasa = [
    {
      size: '12',
      title: 'Dirección:',
      position: 'stacked',
      type: 'text',
      formC: 'publilocalizacion',
      icon: 'cash',
    },
    {
      size: '6',
      title: 'Precio (S/.):',
      position: 'stacked',
      type: 'text',
      formC: 'publiprecio',
      icon: 'cart',
    },
    {
      size: '6',
      title: 'Área (m2):',
      position: 'stacked',
      type: 'text',
      formC: 'publiarea',
      icon: 'notifications',
    },
  ];
  img: string[] = [];
  imgRutaSubida: ArchivoRequest[] = [];
  vendeForm: FormGroup;
  fechaActual: Date = new Date();
  imagenPrincipal: string;
  constructor(
    private modal: ModalController,
    private fb: FormBuilder,
    private sanitizer: DomSanitizer,
    private toast: ToastService,
    private publicSvc: PublicacionService,
    private token: TokenService,
    private loading: LoadingService,
    private google: GoogleMapsService
  ) {
    this.vendeForm = this.fb.group({
      publifechaentera: ['', [Validators.required]],
      publitituloanuncio: ['', [Validators.required]],
      publiDescripcion: ['', [Validators.required]],
      publilocalizacion: ['', [Validators.required]],
      publiprecio: ['', [Validators.required]],
      publiarea: ['', [Validators.required]],
      condicion: ['', Validators.required],
      publicantBanios: ['', Validators.required],
      publicantCuarto: ['', Validators.required],
      publipiscina: [0, Validators.required],
      publipet: [0, Validators.required],
      publicochera: [0, Validators.required],
      publiProvincia: ['', Validators.required],
    });
  }

  ngOnInit() {}

  guardarPublicacion() {
    const ubi = this.google.returnUbi();

    if (
      !this.vendeForm.valid ||
      this.imgRutaSubida.length === 0 ||
      ubi === null
    ) {
      this.toast.presentToast('Complete los campos', 'danger', 'top', 1500);
      return true;
    }
    const dataFinal: Publicacion = this.vendeForm.value;
    dataFinal.publilatitud = ubi.lat;
    dataFinal.publilongitud = ubi.long;
    dataFinal.detallesCasa = this.formatDetalles();
    dataFinal.imagenes = this.imgRutaSubida;
    dataFinal.publipet = 0;
    dataFinal.publicochera = 0;
    dataFinal.publitipo = 'Alquiler';
    dataFinal.publiUsuid = Number(this.token.getUserID());
    this.loading.presentLoading('Guardando publicación...');
    this.publicSvc.guardarPublicacion(dataFinal).subscribe(
      (data) => {
        if (data) {
          this.toast.presentToast(
            'Publicación subida correctamente',
            'success',
            'top',
            1000
          );
          this.loading.closeLoading();
          this.cerrarModal();
        }
      },
      (err) => {
        this.toast.presentToast(
          'Error en subir publicación',
          'danger',
          'top',
          1500
        );
        this.loading.closeLoading();
        console.log(err);
      }
    );
  }
  formatDetalles(): DetallesCasa[] {
    let detail: DetallesCasa[] = [];
    detail.push({
      idDetalle: 13,
      cantidad: this.vendeForm.get('condicion').value,
    });
    detail.push({
      idDetalle: 1,
      cantidad: this.vendeForm.get('publicantBanios').value,
    });
    detail.push({
      idDetalle: 2,
      cantidad: this.vendeForm.get('publicantCuarto').value,
    });
    detail.push({
      idDetalle: 6,
      cantidad: this.vendeForm.get('publicochera').value ? 2 : 1,
    });
    detail.push({
      idDetalle: 7,
      cantidad: this.vendeForm.get('publipet').value ? 2 : 1,
    });
    return detail;
  }

  async addPhoto() {
    const image = await Camera.getPhoto({
      quality: 60,
      allowEditing: true,
      resultType: CameraResultType.Base64,
    });
    this.img.push('data:image/jpeg;base64,' + image.base64String);

    this.imgRutaSubida.push({
      nombre: this.generateName(6),
      imagensrc: image.base64String,
      extension: image.format,
    });
  }

  generateName(num: number) {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result1 = ' ';
    const charactersLength = characters.length;
    for (let i = 0; i < num; i++) {
      result1 += characters.charAt(
        Math.floor(Math.random() * charactersLength)
      );
    }

    return result1;
  }

  getBackground(image) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(image);
  }
  cerrarModal() {
    this.modal.dismiss();
  }
}
