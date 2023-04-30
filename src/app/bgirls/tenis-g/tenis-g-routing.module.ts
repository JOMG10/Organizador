import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TenisGPage } from './tenis-g.page';

const routes: Routes = [
  {
    path: '',
    component: TenisGPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TenisGPageRoutingModule {}
