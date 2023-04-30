import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BoysPage } from './boys.page';

const routes: Routes = [
  {
    path: '',
    component: BoysPage
  },
  {
    path: 'tenis-b',
    loadChildren: () => import('./tenis-b/tenis-b.module').then( m => m.TenisBPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoysPageRoutingModule {}
