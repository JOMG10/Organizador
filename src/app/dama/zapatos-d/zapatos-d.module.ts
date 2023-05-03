import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ZapatosDPageRoutingModule } from './zapatos-d-routing.module';

import { ZapatosDPage } from './zapatos-d.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ZapatosDPageRoutingModule
  ],
  declarations: [ZapatosDPage]
})
export class ZapatosDPageModule {}
