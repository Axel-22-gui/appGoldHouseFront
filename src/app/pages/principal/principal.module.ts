import { ComponentsModule } from './../../components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PrincipalPageRoutingModule } from './principal-routing.module';

import { PrincipalPage } from './principal.page';
import { DetalleViviComponent } from './detalle-vivi/detalle-vivi.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PrincipalPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [PrincipalPage, DetalleViviComponent],
})
export class PrincipalPageModule {}
