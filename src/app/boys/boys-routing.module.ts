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
  },  {
    path: 'zapatos-b',
    loadChildren: () => import('./zapatos-b/zapatos-b.module').then( m => m.ZapatosBPageModule)
  },
  {
    path: 'sandalias-b',
    loadChildren: () => import('./sandalias-b/sandalias-b.module').then( m => m.SandaliasBPageModule)
  },
  {
    path: 'accesorios-b',
    loadChildren: () => import('./accesorios-b/accesorios-b.module').then( m => m.AccesoriosBPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BoysPageRoutingModule {}
