import { Component, OnInit } from '@angular/core';
import {FirestoreService} from "../services/firestore.service";

interface Sandalias {
  nombreS: string;
  descripcionS: string;
  precioS:string;
  coloresS:string;
  rutaImagenS:string;
  idS:string;
}

@Component({
  selector: 'app-asandalias',
  templateUrl: './asandalias.page.html',
  styleUrls: ['./asandalias.page.scss'],
})
export class AsandaliasPage implements OnInit {

  constructor(public firestore: FirestoreService) { }

  ngOnInit() {
    this.getActividadS();

  }

  ///parte de las sandalias

  private pathS = 'Sandalias/';
  contenidoS:Sandalias[] = [];
  San : Sandalias = {
    nombreS:'',
    descripcionS:'',
    precioS: '',
    coloresS: '',
    rutaImagenS:'',
    idS:this.firestore.getId()
  };

  getActividadS(){
    this.firestore.getCollection<Sandalias>(this.pathS).subscribe( res => {
      this.contenidoS = res;
    });
  }

}
