import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SandaliasDPageRoutingModule } from './sandalias-d-routing.module';

import { SandaliasDPage } from './sandalias-d.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SandaliasDPageRoutingModule
  ],
  declarations: [SandaliasDPage]
})
export class SandaliasDPageModule {}
