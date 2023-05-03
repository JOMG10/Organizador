import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DamaPage } from './dama.page';

const routes: Routes = [
  {
    path: '',
    component: DamaPage
  },
  {
    path: 'tenis-d',
    loadChildren: () => import('./tenis-d/tenis-d.module').then( m => m.TenisDPageModule)
  },
  {
    path: 'zapatos-d',
    loadChildren: () => import('./zapatos-d/zapatos-d.module').then( m => m.ZapatosDPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DamaPageRoutingModule {}
