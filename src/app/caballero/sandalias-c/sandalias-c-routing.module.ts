import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SandaliasCPage } from './sandalias-c.page';

const routes: Routes = [
  {
    path: '',
    component: SandaliasCPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SandaliasCPageRoutingModule {}
