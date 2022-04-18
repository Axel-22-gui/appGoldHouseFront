import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ComprasPageRoutingModule } from './compras-routing.module';

import { ComprasPage } from './compras.page';
import { ComponentsModule } from 'src/app/components/components.module';
import { VendePropComponent } from './vende-prop/vende-prop.component';
import { AlquilaPropComponent } from './alquila-prop/alquila-prop.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ComprasPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [ComprasPage, VendePropComponent, AlquilaPropComponent],
})
export class ComprasPageModule {}
