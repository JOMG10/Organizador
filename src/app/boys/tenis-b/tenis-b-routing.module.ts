import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TenisBPage } from './tenis-b.page';

const routes: Routes = [
  {
    path: '',
    component: TenisBPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TenisBPageRoutingModule {}
