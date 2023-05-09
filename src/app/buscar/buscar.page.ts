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


  private pathAgregar='Tenis/';

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


  searchTerm: string = '';
  searchResults: Observable<any[]>;

  constructor(private afs: AngularFirestore, private firestore: FirestoreService) {}

  ngOnInit() {
    // Creamos un observable para cada colección que queremos buscar
    const collection1$ = this.afs.collection(this.pathAgregar).valueChanges();
    const collection2$ = this.afs.collection('collection2').valueChanges();
    const collection3$ = this.afs.collection('collection3').valueChanges();

    // Combinamos los observables en un solo observable con combineLatest
    const allCollections$ = combineLatest([collection1$, collection2$, collection3$]).pipe(
      // Utilizamos map para unir los resultados en un solo arreglo
      map(collections => collections.reduce((acc, cur) => acc.concat(cur)))
    );

    // Utilizamos el método switchMap para cambiar el observable de searchResults
    // cada vez que cambia el valor de searchTerm
    this.searchResults = this.searchTerm.toLowerCase().trim()
      ? allCollections$.pipe(
        map(items =>
          items.filter(
            item =>
              this.act.nombre.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
              this.act.descripcion.toLowerCase().includes(this.searchTerm.toLowerCase())
          )
        )
      )
      : allCollections$;
  }

  /*
  searchTerm: string = '';
  searchResults: string[] = [];

  items: string[] = ['Manzana', 'Banana', 'Pera', 'Naranja', 'Mango'];

  searchChanged() {
    this.searchResults = this.items.filter(item =>
      item.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

   */


  searchChanged() {

  }
}
