import { LoadingService } from './../../../services/loading.service';
import { ToastService } from 'src/app/services/toast.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { TokenService } from 'src/app/services/token.service';
import { TransaccionService } from 'src/app/services/transaccion.service';

@Component({
  selector: 'app-form-card',
  templateUrl: './form-card.component.html',
  styleUrls: ['./form-card.component.scss'],
})
export class FormCardComponent implements OnInit {
  tarjetaForm: FormGroup;
  public datos = [
    {
      titulo: 'Número de Tarjeta',
      col: '12',
      type: 'text',
      form: 'tarjeta',
      icon: 'card-outline',
    },
    {
      titulo: 'CCV',
      col: '4',
      type: 'tel',
      form: 'ccv',
      icon: 'card-outline',
    },
    {
      titulo: 'Mes',
      col: '4',
      type: 'tel',
      form: 'mes',
      icon: 'calendar-outline',
    },
    {
      titulo: 'Año',
      col: '4',
      type: 'tel',
      form: 'anio',
      icon: 'calendar-outline',
    },
    {
      titulo: 'Titular',
      col: '12',
      type: 'text',
      form: 'titular',
      icon: 'id-card-outline',
    },
  ];
  noneed = true;
  constructor(
    private fb: FormBuilder,
    private token: TokenService,
    private action: AlertController,
    private toast: ToastService,
    private loading: LoadingService,
    private transSvc: TransaccionService
  ) {
    this.tarjetaForm = this.fb.group({
      transamonto: [40, Validators.required],
      iduser: [this.token.getUserID()],
      tarjeta: ['', Validators.required],
      ccv: ['', Validators.required],
      anio: ['', Validators.required],
      mes: ['', Validators.required],
      titular: ['', Validators.required],
    });
  }

  ngOnInit() {}
  agregarTarjeta() {
    this.loading.presentLoading('Enviando datos...');
    console.log(this.tarjetaForm.value);
    if (this.tarjetaForm.valid) {
      this.loading.closeLoading();
      this.transSvc.send(this.tarjetaForm.value).subscribe((data) => {
        if (data) {
          this.toast.presentToast(
            'Datos ingresados correctamente',
            'success',
            'top',
            1500
          );
          this.closeModal();
          this.token.setPremiun('Premium');
        }
        this.loading.closeLoading();
      });
    } else {
      this.toast.presentToast(
        'Complete todos los campos',
        'danger',
        'top',
        1000
      );
      this.loading.closeLoading();
    }
  }

  async presentAlertConfirm() {
    const alert = await this.action.create({
      header: 'Confirmación!',
      message:
        'Confirma el ingreso de los datos de <strong>sus cuentas de crédito </strong> para el débito automático?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          id: 'cancel-button',
          handler: (blah) => {
            console.log('Confirm Cancel: blah');
          },
        },
        {
          text: 'Sí!',
          id: 'confirm-button',
          handler: () => {
            this.agregarTarjeta();
          },
        },
      ],
    });

    await alert.present();
  }

  closeModal() {}
}
