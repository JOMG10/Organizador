import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AtenisPageRoutingModule } from './atenis-routing.module';

import { AtenisPage } from './atenis.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AtenisPageRoutingModule
  ],
  declarations: [AtenisPage]
})
export class AtenisPageModule {}
