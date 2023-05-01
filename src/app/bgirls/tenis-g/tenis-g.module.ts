import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TenisGPageRoutingModule } from './tenis-g-routing.module';

import { TenisGPage } from './tenis-g.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TenisGPageRoutingModule
  ],
  declarations: [TenisGPage]
})
export class TenisGPageModule {}
