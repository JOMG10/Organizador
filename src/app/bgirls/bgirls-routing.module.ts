import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BgirlsPage } from './bgirls.page';

const routes: Routes = [
  {
    path: '',
    component: BgirlsPage
  },
  {
    path: 'tenis-g',
    loadChildren: () => import('./tenis-g/tenis-g.module').then( m => m.TenisGPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BgirlsPageRoutingModule {}
