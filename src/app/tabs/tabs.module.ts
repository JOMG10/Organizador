import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import {RouterLink} from "@angular/router";
import {Tab1PageModule} from "../tab1/tab1.module";
import {Tab2PageModule} from "../tab2/tab2.module";
import {Tab3PageModule} from "../tab3/tab3.module";
import {Tab4PageModule} from "../tab4/tab4.module";

@NgModule({
    imports: [
        IonicModule,
        CommonModule,
        FormsModule,
        TabsPageRoutingModule,
        RouterLink,
        Tab1PageModule,
        Tab2PageModule,
        Tab3PageModule,
        Tab4PageModule
    ],
  declarations: [TabsPage]
})
export class TabsPageModule {}
