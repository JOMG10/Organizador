import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AsandaliasPageRoutingModule } from './asandalias-routing.module';

import { AsandaliasPage } from './asandalias.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AsandaliasPageRoutingModule
  ],
  declarations: [AsandaliasPage]
})
export class AsandaliasPageModule {}
