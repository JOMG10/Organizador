import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZapatosGPageRoutingModule } from './zapatos-g-routing.module';

import { ZapatosGPage } from './zapatos-g.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZapatosGPageRoutingModule
  ],
  declarations: [ZapatosGPage]
})
export class ZapatosGPageModule {}
