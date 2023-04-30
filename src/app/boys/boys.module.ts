import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BoysPageRoutingModule } from './boys-routing.module';

import { BoysPage } from './boys.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BoysPageRoutingModule
  ],
  declarations: [BoysPage]
})
export class BoysPageModule {}
