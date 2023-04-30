import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZapatosCPage } from './zapatos-c.page';

const routes: Routes = [
  {
    path: '',
    component: ZapatosCPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZapatosCPageRoutingModule {}
