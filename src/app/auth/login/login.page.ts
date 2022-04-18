import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  loginForm: FormGroup;
  constructor(private authSvc: AuthService, private fb: FormBuilder) {
    this.loginForm = this.fb.group({
      userNumerodoc: ['', Validators.required],
      userPassword: ['', Validators.required],
    });
  }

  ngOnInit() {}
  llevar() {
    this.authSvc.login(this.loginForm.value);
  }
}
