import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccesoriosGPageRoutingModule } from './accesorios-g-routing.module';

import { AccesoriosGPage } from './accesorios-g.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccesoriosGPageRoutingModule
  ],
  declarations: [AccesoriosGPage]
})
export class AccesoriosGPageModule {}
