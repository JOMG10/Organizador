import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SandaliasCPageRoutingModule } from './sandalias-c-routing.module';

import { SandaliasCPage } from './sandalias-c.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SandaliasCPageRoutingModule
  ],
  declarations: [SandaliasCPage]
})
export class SandaliasCPageModule {}
