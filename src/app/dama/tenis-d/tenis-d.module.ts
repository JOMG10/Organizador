import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TenisDPageRoutingModule } from './tenis-d-routing.module';

import { TenisDPage } from './tenis-d.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TenisDPageRoutingModule
  ],
  declarations: [TenisDPage]
})
export class TenisDPageModule {}
