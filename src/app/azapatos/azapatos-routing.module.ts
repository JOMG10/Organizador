import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AzapatosPage } from './azapatos.page';

const routes: Routes = [
  {
    path: '',
    component: AzapatosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AzapatosPageRoutingModule {}
