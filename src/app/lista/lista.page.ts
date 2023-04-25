import { Component, OnInit } from '@angular/core';
import {ActionSheetController, AlertController, ModalController} from "@ionic/angular";
import { NavController } from '@ionic/angular';
import {FormGroup} from "@angular/forms";
import {dateTimestampProvider} from "rxjs/internal/scheduler/dateTimestampProvider";
import {DatePipe} from "@angular/common";



@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],

})
export class ListaPage implements OnInit {

 constructor() {
 }

 ngOnInit() {
 }
}
