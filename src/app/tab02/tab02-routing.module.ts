import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Tab02Page } from './tab02.page';

const routes: Routes = [
  {
    path: '',
    component: Tab02Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Tab02PageRoutingModule {}
