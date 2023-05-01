import { Component, OnInit } from '@angular/core';
import {FirestoreService} from "../../services/firestore.service";

interface Sandalias {
  nombre: string;
  descripcion: string;
  precio:string;
  colores:string;
  rutaImagen:string;
  id:string;
}
@Component({
  selector: 'app-sandalias-c',
  templateUrl: './sandalias-c.page.html',
  styleUrls: ['./sandalias-c.page.scss'],
})
export class SandaliasCPage implements OnInit {

  constructor(public firestore: FirestoreService) { }

  ngOnInit() {
    this.getActividadS();

  }

  ///parte de las sandalias

  private pathS = 'Sandalias/';
  contenidoS:Sandalias[] = [];
  San : Sandalias = {
    nombre:'',
    descripcion:'',
    precio: '',
    colores: '',
    rutaImagen:'',
    id:this.firestore.getId()
  };

  getActividadS(){
    this.firestore.getCollection<Sandalias>(this.pathS).subscribe( res => {
      this.contenidoS = res;
    });
  }

}
