import {Component, OnInit, ViewChild} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, Observable, Subscription} from "rxjs";
import { combineLatest } from 'rxjs';
import {FirestoreService} from "../services/firestore.service";
import {IonModal, ModalController} from "@ionic/angular";

interface Tenis {
  nombre: string;
  descripcion: string;
  precio:number;
  colores:string;
  rutaImagen:string;
  id:string;
  categoria:string;
}


@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage implements OnInit {


  private path = 'Tenis/';
  private path2 = 'TenisD/';
  private path3 = 'TenisG/';
  private path4 = 'TenisB/';
  private path5 = 'Zapatos/';
  private path6 = 'ZapatosD/';
  private path7 = 'ZapatosG/';
  private path8 = 'ZapatosB/';



  searchedUser:any;
  users:any = [];

  nombre:"";
  categoria:"";


  contenido:Tenis[] = [];
  act : Tenis = {
    nombre:'',
    descripcion:'',
    precio: 0,
    categoria:'',
    colores: '',
    rutaImagen:'',
    id:this.firestore.getId()
  };
  constructor(private afs: AngularFirestore, private firestore: FirestoreService,  private modalController: ModalController) {}

  ngOnInit() {
    this.getActividad();
  }

  getActividad(){
    this.firestore.getCollection<Tenis>(this.path).subscribe( res => {
      this.contenido = res;
    });
  }
  buscar(event) {
    console.log(event);
  }
  searchQuery: string;
  searchResults: any[];
  performSearch() {
    if (this.searchQuery && this.searchQuery.trim() !== '') {
      this.firestore.search(this.searchQuery,this.path,this.path2,this.path3,this.path4,
        this.path5,this.path6,this.path7,this.path8)
        .subscribe(
          (results) => {
            this.searchResults = results;
          },
          (error) => {
            console.error(error);
          }
        );
    } else {
      // Vaciar los resultados si no hay un término de búsqueda válido
      this.searchResults = [];
    }
  }

  @ViewChild(IonModal) modal!: IonModal ;
  enableNewNota: true;

  async abrirModal() {
    await this.modal.present(); // Abrir el ion-modal
  }

  onWillDismiss($event: any) {
  }

}
