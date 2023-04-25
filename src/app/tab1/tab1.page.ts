import {Component, OnInit, ViewChild} from '@angular/core';
import { ModalController ,IonModal} from '@ionic/angular';
import {Actividad, Fondo} from "../models";
import {FirestoreService} from "../services/firestore.service";
import {AngularFireDatabase} from "@angular/fire/compat/database";
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  isVisible = false;

  constructor(public modalController: ModalController, public firestore: FirestoreService,) {
    const prefersDark= window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = prefersDark.matches;
  }


  enableNewNota  = true;

  private path = 'Fondo/';

  ngOnInit(): void { }

  @ViewChild(IonModal) modal!: IonModal ;
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }
  closeModal() {
    this.modalController.dismiss();
  }
  confirm() {
    this.modal.dismiss(this.name, 'confirm');
  }
  INICIO = "INICIO";
  OPCION1 = "OPCION_1"
  name: any;
  segmentValue: any;
  onWillDismiss($event: any) { }
  ionFabAbierto = false;
  async abrirModal() {
    await this.modal.present(); // Abrir el ion-modal
  }
  darkMode: boolean = true;
  cambio(){
    this.darkMode=!this.darkMode;
    document.body.classList.toggle('dark');
  }



}
