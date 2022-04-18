import { SeguimientoService } from './../../../services/seguimiento.service';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { LoadingService } from 'src/app/services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { Seguimiento } from 'src/app/models/seguimiento.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-en-curso',
  templateUrl: './en-curso.component.html',
  styleUrls: ['./en-curso.component.scss'],
})
export class EnCursoComponent implements OnInit {
  showForm = false;
  inputForm: FormGroup;
  lista: Seguimiento[];
  constructor(
    private modalCtlr: ModalController,
    private navParams: NavParams,
    private ofertasSvc: SeguimientoService,
    private toast: ToastService,
    private loading: LoadingService,
    private fb: FormBuilder
  ) {
    this.ofertasSvc
      .listarIncidencia(this.navParams.get('id'))
      .subscribe((data) => (this.lista = data));
    this.inputForm = this.fb.group({
      seguiOfid: [this.navParams.get('id')],
      seguiRespuesta: ['', [Validators.required, Validators.minLength(20)]],
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
    this.ofertasSvc.ingresarRespuesta(this.inputForm.value).subscribe(
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
