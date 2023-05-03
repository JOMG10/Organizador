import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SandaliasGPage } from './sandalias-g.page';

const routes: Routes = [
  {
    path: '',
    component: SandaliasGPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SandaliasGPageRoutingModule {}
