import { ToastService } from './../../services/toast.service';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  registerForm: FormGroup;
  documentos: any;
  constructor(
    private authSvc: AuthService,
    private fb: FormBuilder,
    private toast: ToastService
  ) {
    this.documentos = this.authSvc.traerTiposDoc();
    this.registerForm = this.fb.group({
      userTdId: [0, Validators.required],
      userNumeroDoc: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(13),
        ],
      ],
      userNombre: ['', Validators.required],
      userApellido: ['', Validators.required],
      userTelefono: ['', Validators.required],
      userCorreo: ['', [Validators.required, Validators.email]],
      userPassword: ['', Validators.required],
      userPassword2: [
        '',
        [Validators.required, this.matchValues('userPassword')],
      ],
    });
  }

  ngOnInit() {}

  save() {
    if (this.registerForm.valid) {
      this.authSvc.register(this.registerForm.value);
    } else {
      this.toast.presentToast('Campos Inválidos', 'danger', 'top', 1500);
    }
  }

  matchValues(matchTo: string): (AbstractControl) => ValidationErrors | null {
    return (control: AbstractControl): ValidationErrors | null =>
      !!control.parent &&
      !!control.parent.value &&
      control.value === control.parent.controls[matchTo].value
        ? null
        : { isMatching: false };
  }
}
