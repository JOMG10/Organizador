import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Tab02PageRoutingModule } from './tab02-routing.module';

import { Tab02Page } from './tab02.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        Tab02PageRoutingModule
    ],
    exports: [
        Tab02Page
    ],
    declarations: [Tab02Page]
})
export class Tab02PageModule {}
