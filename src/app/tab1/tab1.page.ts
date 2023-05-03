import {Component, OnInit, ViewChild} from '@angular/core';
import { ModalController ,IonModal} from '@ionic/angular';
import {FirestoreService} from "../services/firestore.service";

interface Zapatos {
  nombre: string;
  descripcion: string;
  precio:number;
  colores:string;
  rutaImagen:string;
  id:string;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  isVisible = false;
  fechaActual: Date;



  constructor(public modalController: ModalController, public firestore: FirestoreService,) {
    this.fechaActual=new Date();
  }

  ngOnInit(): void {
    this.getActividad();
  }


  //contenido de selecciones destacadas para ti
  contend:Zapatos[] = [];
  act : Zapatos = {
    nombre:'',
    descripcion:'',
    precio: 0,
    colores: '',
    rutaImagen:'',
    id:this.firestore.getId()
  };

  getActividad(){
    this.firestore.getCollection<Zapatos>(this.path).subscribe( res => {
      this.contend = res;
    });
  }


  enableNewNota  = true;

  private path = 'Zapatos/';


  models = [
    { id: 1, nombre: 'Sandalias', subtitulo:'contenido de sandalias' },
    { id: 2, nombre: 'Zapatos',  subtitulo:'contenido de Zapatos'},
    { id: 3, nombre: 'Tenis',  subtitulo:'contenido de tenis'},
    { id: 4, nombre: 'Deportes',  subtitulo:'contenido de Deportes ' }
  ];

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




}
