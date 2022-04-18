import { SeguimientoService } from './../../../services/seguimiento.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { Seguimiento } from 'src/app/models/seguimiento.interface';

@Component({
  selector: 'app-compras',
  templateUrl: './compras.component.html',
  styleUrls: ['./compras.component.scss'],
})
export class ComprasComponent implements OnInit {
  showForm = false;
  inputForm: FormGroup;
  lista: Seguimiento[];
  constructor(
    private modalCtlr: ModalController,
    private navParams: NavParams,
    private seguimientSvc: SeguimientoService,
    private toast: ToastService,
    private loading: LoadingService,
    private fb: FormBuilder
  ) {
    this.seguimientSvc
      .listarIncidencia(this.navParams.get('id'))
      .subscribe((data) => (this.lista = data));
    this.inputForm = this.fb.group({
      seguiMensaje: ['', [Validators.required, Validators.minLength(20)]],
      seguiOfid: [this.navParams.get('id')],
    });
  }

  ngOnInit() {}
  agregarIncidencia() {
    this.showForm = !this.showForm;
  }
  closeModal() {
    this.modalCtlr.dismiss();
  }
  enviar() {
    this.loading.presentLoading('Enviando incidencia...');
    console.log(this.inputForm.value);
    this.seguimientSvc.ingresarIncidencia(this.inputForm.value).subscribe(
      (data) => {
        if (data) {
          this.loading.closeLoading();
          this.toast.presentToast(
            'Incidencia enviada correctamente',
            'success',
            'top',
            1000
          );
          this.closeModal();
        }
      },
      (err) => {
        console.log(err);
        this.loading.closeLoading();
        this.toast.presentToast('Incidencia no enviada', 'danger', 'top', 1000);
      }
    );
  }
}
