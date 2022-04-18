import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';

declare var google;

@Injectable({
  providedIn: 'root',
})
export class GoogleMapsService {
  map: any;
  ubi: any;
  private mapsLoaded = false;
  private apiKey = environment.apiKeyGoogle;
  private marker: any;
  private centerChangedCallback: any;
  constructor() {}
  inicializarMapa(render, document): Promise<any> {
    return new Promise((resolve) => {
      if (this.mapsLoaded) {
        resolve(true);
        return;
      }
      const script = render.createElement('script');
      script.id = 'googleMaps';
      window['mapInit'] = () => {
        this.mapsLoaded = true;
        resolve(true);
        return;
      };
      if (this.apiKey) {
        script.src =
          'https://maps.googleapis.com/maps/api/js?key=' +
          this.apiKey +
          '&callback=mapInit';
      } else {
        script.src =
          'https://maps.googleapis.com/maps/api/js?&callback=mapInit';
      }
      render.appendChild(document.body, script);
    });
  }
  async renderMap(divMap, latLng) {
    const position = { lat: -6.7714852011684865, lng: -79.83875183210654 };
    const mapOptions = {
      center: position,
      zoom: 15,
      disableDefaultUI: true,
      clickableIcon: false,
    };
    this.map = new google.maps.Map(divMap.nativeElement, mapOptions);

    if (latLng) {
      console.log(latLng);
      this.addMarker(latLng.lat, latLng.long);
    } else {
      this.map.addListener('click', (e) => {
        this.map.panTo(e.latLng);

        if (this.marker == undefined) {
          this.marker = new google.maps.Marker({
            map: this.map,
            position: e.latLng,
          });
        } else {
          this.marker.setPosition(e.latLng);
          console.log();
          console.log();
        }

        if (this.centerChangedCallback) {
          this.centerChangedCallback(e.latLng);
        }
        this.ubi = {
          lat: e.latLng.lat(),
          long: e.latLng.lng(),
        };
      });
    }
  }
  addMarker(lat, long) {
    this.map.panTo({ lat: parseFloat(lat), lng: parseFloat(long) });

    if (this.marker == undefined) {
      this.marker = new google.maps.Marker({
        map: this.map,
        position: { lat: parseFloat(lat), lng: parseFloat(long) },
      });
    } else {
      this.marker.setPosition({ lat: parseFloat(lat), lng: parseFloat(long) });
    }

    if (this.centerChangedCallback) {
      this.centerChangedCallback({
        lat: parseFloat(lat),
        lng: parseFloat(long),
      });
    }
  }
  returnUbi() {
    if (this.ubi !== undefined) {
      return this.ubi;
    }
  }
}
