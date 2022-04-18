import {
  Component,
  ElementRef,
  Inject,
  Input,
  OnInit,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { GoogleMapsService } from 'src/app/services/google-maps.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {
  @ViewChild('map') divMap: ElementRef;
  @Input() latLong;
  constructor(
    private render: Renderer2,
    @Inject(DOCUMENT) private documentss,
    public googleMapsS: GoogleMapsService
  ) {}
  ngOnInit() {
    this.initial();
  }
  initial() {
    this.googleMapsS
      .inicializarMapa(this.render, this.documentss)
      .then(() => {
        console.log(this.divMap);
        this.googleMapsS.renderMap(this.divMap, this.latLong);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}
