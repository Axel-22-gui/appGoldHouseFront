import { AdminPageModule } from './../admin/admin.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from 'src/app/guards/admin.guard';

import { GeneralPage } from './general.page';

const routes: Routes = [
  {
    path: '',
    component: GeneralPage,
    children: [
      {
        path: 'compras',
        loadChildren: () =>
          import('../principal/principal.module').then(
            (m) => m.PrincipalPageModule
          ),
      },
      {
        path: 'ventas',
        loadChildren: () =>
          import('../compras/compras.module').then((m) => m.ComprasPageModule),
      },
      {
        path: 'seguimiento',
        loadChildren: () =>
          import('../seguimiento/seguimiento.module').then(
            (m) => m.SeguimientoPageModule
          ),
      },
      {
        path: 'perfil',
        loadChildren: () =>
          import('../perfil/perfil.module').then((m) => m.PerfilPageModule),
      },
      {
        path: 'admin',
        loadChildren: () =>
          import('./../admin/admin.module').then((m) => m.AdminPageModule),
        canActivate: [AdminGuard],
      },
      {
        path: '',
        redirectTo: '/general/compras',
        pathMatch: 'full',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GeneralPageRoutingModule {}
