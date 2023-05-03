import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SandaliasDPage } from './sandalias-d.page';

const routes: Routes = [
  {
    path: '',
    component: SandaliasDPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SandaliasDPageRoutingModule {}
