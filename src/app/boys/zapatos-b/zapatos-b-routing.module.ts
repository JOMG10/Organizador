import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZapatosBPage } from './zapatos-b.page';

const routes: Routes = [
  {
    path: '',
    component: ZapatosBPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZapatosBPageRoutingModule {}
