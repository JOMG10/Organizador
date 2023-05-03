import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SandaliasBPageRoutingModule } from './sandalias-b-routing.module';

import { SandaliasBPage } from './sandalias-b.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SandaliasBPageRoutingModule
  ],
  declarations: [SandaliasBPage]
})
export class SandaliasBPageModule {}
