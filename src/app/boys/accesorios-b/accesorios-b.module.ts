import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccesoriosBPageRoutingModule } from './accesorios-b-routing.module';

import { AccesoriosBPage } from './accesorios-b.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccesoriosBPageRoutingModule
  ],
  declarations: [AccesoriosBPage]
})
export class AccesoriosBPageModule {}
