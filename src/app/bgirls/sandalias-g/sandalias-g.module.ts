import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SandaliasGPageRoutingModule } from './sandalias-g-routing.module';

import { SandaliasGPage } from './sandalias-g.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SandaliasGPageRoutingModule
  ],
  declarations: [SandaliasGPage]
})
export class SandaliasGPageModule {}
