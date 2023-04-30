import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TenisCPage } from './tenis-c.page';

const routes: Routes = [
  {
    path: '',
    component: TenisCPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TenisCPageRoutingModule {}
