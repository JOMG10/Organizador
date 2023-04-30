import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AsandaliasPage } from './asandalias.page';

const routes: Routes = [
  {
    path: '',
    component: AsandaliasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AsandaliasPageRoutingModule {}
