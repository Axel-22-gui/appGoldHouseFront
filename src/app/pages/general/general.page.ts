import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/services/token.service';

@Component({
  selector: 'app-general',
  templateUrl: './general.page.html',
  styleUrls: ['./general.page.scss'],
})
export class GeneralPage implements OnInit {
  public appPages = [
    { title: 'Compra', url: '/general/compras', icon: 'cash' },
    { title: 'Venta', url: '/general/ventas', icon: 'cart' },
    {
      title: 'Seguimiento',
      url: '/general/seguimiento',
      icon: 'notifications',
    },
    { title: 'Perfil', url: '/general/perfil', icon: 'person-circle' },
  ];
  constructor(private token: TokenService, private router: Router) {}
  ngOnInit() {}
  showMenu() {
    return this.token.getUserID() !== null;
  }
  showAdm() {
    return this.token.getDni() === '12345678';
  }
  cerrar() {
    this.token.logout();
    this.router.navigate(['/login']);
  }
}
