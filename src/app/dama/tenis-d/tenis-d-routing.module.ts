import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TenisDPage } from './tenis-d.page';

const routes: Routes = [
  {
    path: '',
    component: TenisDPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TenisDPageRoutingModule {}
