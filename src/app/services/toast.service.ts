import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor(private toast: ToastController) {}
  async presentToast(message, color, position, duration) {
    const toast = await this.toast.create({
      message,
      color,
      position,
      duration,
    });
    toast.present();
  }
}
