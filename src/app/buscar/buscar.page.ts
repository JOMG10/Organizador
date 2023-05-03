import { Component, OnInit } from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, Observable} from "rxjs";
import { combineLatest } from 'rxjs';
import {FirestoreService} from "../services/firestore.service";

interface Tenis {
  nombre: string;
  descripcion: string;
  precio:number;
  colores:string;
  rutaImagen:string;
  id:string;
}


@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage implements OnInit {


  private path = 'Tenis/';
  searchedUser:any;
  users:any = [];

  nombre:"";

  contenido:Tenis[] = [];
  act : Tenis = {
    nombre:'',
    descripcion:'',
    precio: 0,
    colores: '',
    rutaImagen:'',
    id:this.firestore.getId()
  };


  //searchTerm: string = '';
searchResultss: Observable<any[]>;

  constructor(private afs: AngularFirestore, private firestore: FirestoreService) {}

  ngOnInit() {
    this.getActividad();
  }

  getActividad(){
    this.firestore.getCollection<Tenis>(this.path).subscribe( res => {
      this.contenido = res;
    });
  }


  searchTerm: string = '';
  searchResults: string[] = [];
  items: string[] = ['Manzana', 'Banana', 'Pera', 'Naranja', 'Mango'];

  searchChanged() {
    this.searchResults = this.items.filter(item =>
      item.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  buscar(event) {
    console.log(event);
  }
}
