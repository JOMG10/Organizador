import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab7PageRoutingModule } from './tab7-routing.module';

import { Tab7Page } from './tab7.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Tab7PageRoutingModule
  ],
  exports: [
    Tab7Page
  ],
  declarations: [Tab7Page]
})
export class Tab7PageModule {}
