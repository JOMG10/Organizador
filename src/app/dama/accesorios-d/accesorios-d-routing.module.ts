import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AccesoriosDPage } from './accesorios-d.page';

const routes: Routes = [
  {
    path: '',
    component: AccesoriosDPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AccesoriosDPageRoutingModule {}
