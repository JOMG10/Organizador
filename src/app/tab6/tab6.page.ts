import { Component, OnInit } from '@angular/core';
import {FirestoreService} from "../services/firestore.service";
import firebase from "firebase/compat";
import firestore = firebase.firestore;
import {object} from "@angular/fire/database";

interface Configuracion{
  fondo:boolean
  id:string;
}
@Component({
  selector: 'app-tab6',
  templateUrl: './tab6.page.html',
  styleUrls: ['./tab6.page.scss'],
})
export class Tab6Page implements OnInit {

  darkMode: boolean = false;
  private path = 'Fondo/';
   enableNewNota: false;


  constructor(public firestore: FirestoreService) {
    const prefersDark= window.matchMedia('(prefers-color-scheme: dark)');
    this.darkMode = prefersDark.matches;
  }

  ngOnInit() {
    this.getActividad();
  }

  notas:Configuracion[] = [];
   config: Configuracion ={
    fondo: false,
     id:this.firestore.getId()
   };


  getActividad(){
    this.firestore.getCollection<Configuracion>(this.path).subscribe( res => {
      this.notas = res;
    });
  }

    cambio(){
    this.darkMode=!this.darkMode;
    document.body.classList.toggle('dark');
  }

}
