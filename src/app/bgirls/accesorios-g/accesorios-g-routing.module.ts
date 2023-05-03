import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccesoriosGPage } from './accesorios-g.page';

const routes: Routes = [
  {
    path: '',
    component: AccesoriosGPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccesoriosGPageRoutingModule {}
