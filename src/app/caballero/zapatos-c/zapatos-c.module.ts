import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZapatosCPageRoutingModule } from './zapatos-c-routing.module';

import { ZapatosCPage } from './zapatos-c.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZapatosCPageRoutingModule
  ],
  declarations: [ZapatosCPage]
})
export class ZapatosCPageModule {}
