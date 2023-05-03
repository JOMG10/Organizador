import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccesoriosBPage } from './accesorios-b.page';

const routes: Routes = [
  {
    path: '',
    component: AccesoriosBPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccesoriosBPageRoutingModule {}
