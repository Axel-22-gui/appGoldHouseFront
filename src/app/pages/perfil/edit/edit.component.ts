import { ToastService } from './../../../services/toast.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss'],
})
export class EditComponent implements OnInit {
  editForm: FormGroup;
  public datos = [
    { titulo: 'Nombre', col: '12', type: 'text', form: 'userNombre' },
    { titulo: 'Apellido', col: '12', type: 'text', form: 'userApellido' },
    { titulo: 'DNI', col: '6', type: 'number', form: 'userNumeroDoc' },
    { titulo: 'Teléfono', col: '6', type: 'tel', form: 'userTelefono' },
    { titulo: 'Dirección', col: '12', type: 'text', form: 'userdireccion' },
    { titulo: 'Correo', col: '12', type: 'email', form: 'userCorreo' },
  ];

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private fb: FormBuilder,
    private authSvc: AuthService,
    private toast: ToastService
  ) {
    this.editForm = this.fb.group({
      userNombre: ['', [Validators.required]],
      userApellido: ['', [Validators.required]],
      userNumeroDoc: ['', [Validators.required]],
      userTelefono: ['', [Validators.required]],
      userdireccion: ['', [Validators.required]],
      userCorreo: ['', [Validators.required]],
    });
    this.patch();
  }

  patch() {
    this.editForm.patchValue({
      userNombre: this.navParams.get('nombre'),
      userApellido: this.navParams.get('apellido'),
      userNumeroDoc: this.navParams.get('dni'),
      userTelefono: this.navParams.get('telefono'),
      userdireccion: this.navParams.get('direccion'),
      userCorreo: this.navParams.get('correo'),
    });
  }

  ngOnInit() {}
  editarDatos() {
    if (this.editForm.valid) {
      this.authSvc.editarDatos(this.editForm.value);
    } else {
      this.toast.presentToast('Campos Inválidos', 'danger', 'top', 1500);
    }
  }
  closeModal() {
    this.modalController.dismiss();
  }
}
