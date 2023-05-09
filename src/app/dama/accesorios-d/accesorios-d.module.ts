import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccesoriosDPageRoutingModule } from './accesorios-d-routing.module';

import { AccesoriosDPage } from './accesorios-d.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccesoriosDPageRoutingModule
  ],
  declarations: [AccesoriosDPage]
})
export class AccesoriosDPageModule {}
