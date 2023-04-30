import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TenisBPageRoutingModule } from './tenis-b-routing.module';

import { TenisBPage } from './tenis-b.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TenisBPageRoutingModule
  ],
  declarations: [TenisBPage]
})
export class TenisBPageModule {}
