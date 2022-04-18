import { LoadingController } from '@ionic/angular';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  loading: HTMLIonLoadingElement;
  isLoading = false;
  constructor(public loadingCtrl: LoadingController) {}

  async presentLoading(message) {
    this.isLoading = true;
    this.loadingCtrl
      .create({
        message,
      })
      .then((loader) => {
        loader.present().then(() => {
          if (!this.isLoading) {
            loader.dismiss();
          }
        });
      });
  }

  async closeLoading() {
    this.isLoading = false;
    this.loadingCtrl.getTop().then((loader) => {
      if (loader) {
        loader.dismiss();
      }
    });
  }
}
