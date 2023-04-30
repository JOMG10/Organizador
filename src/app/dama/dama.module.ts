import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DamaPageRoutingModule } from './dama-routing.module';

import { DamaPage } from './dama.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DamaPageRoutingModule
  ],
  declarations: [DamaPage]
})
export class DamaPageModule {}
