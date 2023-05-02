import {NgModule, OnInit} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {RouteReuseStrategy, RouterModule} from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {AngularFireModule} from "@angular/fire/compat";
import {environment} from "../environments/environment";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {TabsPageModule} from "./tabs/tabs.module";
import {LoginPageModule} from "./login/login.module";

@NgModule({
  declarations: [AppComponent],
  exports: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig), IonicModule, FormsModule, ReactiveFormsModule,
    RouterModule, AngularFireAuthModule, AngularFirestoreModule, TabsPageModule, LoginPageModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],


})
export class AppModule {

}


