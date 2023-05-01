import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AzapatosPageRoutingModule } from './azapatos-routing.module';

import { AzapatosPage } from './azapatos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AzapatosPageRoutingModule
  ],
  declarations: [AzapatosPage]
})
export class AzapatosPageModule {}
