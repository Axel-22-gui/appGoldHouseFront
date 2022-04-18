import { EnCursoComponent } from './en-curso/en-curso.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SeguimientoPageRoutingModule } from './seguimiento-routing.module';

import { SeguimientoPage } from './seguimiento.page';
import { PublicaComponent } from './publica/publica.component';
import { ComprasComponent } from './compras/compras.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    SeguimientoPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [
    SeguimientoPage,
    PublicaComponent,
    ComprasComponent,
    EnCursoComponent,
  ],
})
export class SeguimientoPageModule {}
