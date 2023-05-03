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
  },  {
    path: 'zapatos-g',
    loadChildren: () => import('./zapatos-g/zapatos-g.module').then( m => m.ZapatosGPageModule)
  },
  {
    path: 'sandalias-g',
    loadChildren: () => import('./sandalias-g/sandalias-g.module').then( m => m.SandaliasGPageModule)
  },
  {
    path: 'accesorios-g',
    loadChildren: () => import('./accesorios-g/accesorios-g.module').then( m => m.AccesoriosGPageModule)
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BgirlsPageRoutingModule {}
