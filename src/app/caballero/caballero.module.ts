import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CaballeroPageRoutingModule } from './caballero-routing.module';

import { CaballeroPage } from './caballero.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CaballeroPageRoutingModule
  ],
  declarations: [CaballeroPage]
})
export class CaballeroPageModule {}
