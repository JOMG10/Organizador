import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BgirlsPageRoutingModule } from './bgirls-routing.module';

import { BgirlsPage } from './bgirls.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BgirlsPageRoutingModule
  ],
  declarations: [BgirlsPage]
})
export class BgirlsPageModule {}
