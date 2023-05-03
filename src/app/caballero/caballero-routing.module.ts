import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CaballeroPage } from './caballero.page';

const routes: Routes = [
  {
    path: '',
    component: CaballeroPage
  },
  {
    path: 'tenis-c',
    loadChildren: () => import('./tenis-c/tenis-c.module').then( m => m.TenisCPageModule)
  },
  {
    path: 'zapatos-c',
    loadChildren: () => import('./zapatos-c/zapatos-c.module').then( m => m.ZapatosCPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CaballeroPageRoutingModule {}
