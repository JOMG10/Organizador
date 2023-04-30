import { Component, OnInit } from '@angular/core';
import {FirestoreService} from "../services/firestore.service";


interface Carrito {
  nombre: string;
  descripcion: string;
  precio:string;
  colores:string;
  rutaImagen:string;
  id:string;
}





@Component({
  selector: 'app-lista',
  templateUrl: './lista.page.html',
  styleUrls: ['./lista.page.scss'],

})
export class ListaPage implements OnInit {

  private path = 'Carrito/';

 constructor(public firestore: FirestoreService) {
 }

 ngOnInit() {
   this.getActividad();
 }

  contenido:Carrito[] = [];
  carro : Carrito = {
    nombre:'',
    descripcion:'',
    precio: '',
    colores: '',
    rutaImagen:'',
    id:this.firestore.getId()
  };

  getActividad(){
    this.firestore.getCollection<Carrito>(this.path).subscribe( res => {
      this.contenido = res;
    });
  }


}
