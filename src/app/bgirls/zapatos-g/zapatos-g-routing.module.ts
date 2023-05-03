import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ZapatosGPage } from './zapatos-g.page';

const routes: Routes = [
  {
    path: '',
    component: ZapatosGPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ZapatosGPageRoutingModule {}
