import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZapatosBPageRoutingModule } from './zapatos-b-routing.module';

import { ZapatosBPage } from './zapatos-b.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZapatosBPageRoutingModule
  ],
  declarations: [ZapatosBPage]
})
export class ZapatosBPageModule {}
