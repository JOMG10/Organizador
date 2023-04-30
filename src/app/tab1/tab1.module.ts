import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab1Page } from './tab1.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { Tab1PageRoutingModule } from './tab1-routing.module';
import {Tab02PageModule} from "../tab02/tab02.module";
import {FormularioPageModule} from "../formulario/formulario.module";
import {TabsPageModule} from "../tabs/tabs.module";

let SharedModule;

@NgModule({
  declarations: [Tab1Page],
  exports: [
    Tab1Page
  ],
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab1PageRoutingModule,
    Tab02PageModule,
    FormularioPageModule,
  ]
})
export class Tab1PageModule {}
