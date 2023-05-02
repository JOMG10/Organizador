import {Component, OnInit, ViewChild} from '@angular/core';
import {IonModal, ModalController} from "@ionic/angular";
import {FirestoreService} from "../services/firestore.service";

interface DataItem {
  nombre: String;
  apellido:String;
}

interface Pendientes {
  nombre: string;
  descripcion: string;
  precio:string;
  colores:string;
  rutaImagen:string;
  id:string;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],

})

export class Tab3Page implements OnInit{

  @ViewChild(IonModal) modal!: IonModal ;

  constructor(public modalController: ModalController, private firestore:FirestoreService) {
  }
  ngOnInit() {
    this.getActividad();
  }

  visible = false;


  data: any;
  isVisible: any;
  currentSolicitud: any;
  enableNewNota  = true;

  private path="Pendientes/";

  contenido:Pendientes[] = [];
  carro : Pendientes = {
    nombre:'',
    descripcion:'',
    precio: '',
    colores: '',
    rutaImagen:'',
    id:this.firestore.getId()
  };

  getActividad(){
    this.firestore.getCollection<Pendientes>(this.path).subscribe( res => {
      this.contenido = res;
    });
  }

  showModal(i: any): void {
    this.isVisible = true;
  }

  segmentValue = 'option1'; // Valor por defecto del segmento
  closeModal() {
    this.modalController.dismiss();
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  nuevoItem = { nombre: '', apellido: '' }; // Variable para almacenar los datos del nuevo item


  async mostrarModal() {
    const modal = await this.modalController.create({
      component: 'mi-modal', // Nombre del componente del modal
    });
    modal.present();
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  guardarNuevoItem() {
    // Validar que se hayan llenado ambos campos del formulario
    if (this.nuevoItem.nombre && this.nuevoItem.apellido) {
      // Cerrar el modal y pasar los datos del nuevo item como resultado
      this.modalController.dismiss({ data: this.nuevoItem });
    }
  }

  //abrir modal
  onWillDismiss($event: any) {  }
  async abrirModal() {
    await this.modal.present(); // Abrir el ion-modal
  }





}
