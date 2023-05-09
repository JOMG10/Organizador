import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SandaliasBPage } from './sandalias-b.page';

const routes: Routes = [
  {
    path: '',
    component: SandaliasBPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SandaliasBPageRoutingModule {}
