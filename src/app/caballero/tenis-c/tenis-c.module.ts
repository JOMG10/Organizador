import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TenisCPageRoutingModule } from './tenis-c-routing.module';

import { TenisCPage } from './tenis-c.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TenisCPageRoutingModule
  ],
  declarations: [TenisCPage]
})
export class TenisCPageModule {}
