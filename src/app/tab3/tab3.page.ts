import {Component, OnInit, ViewChild} from '@angular/core';
import {ActionSheetController, AlertController, IonModal, ModalController} from "@ionic/angular";
import {FirestoreService} from "../services/firestore.service";


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

  constructor(public modalController: ModalController, private firestore:FirestoreService,
              private actionSheetCtrl: ActionSheetController, private alertController:AlertController) {
  }
  ngOnInit() {
    this.getActividad();
  }

  visible = false;
  data: any;
  isVisible: any;
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

  async mostrarModal() {
    const modal = await this.modalController.create({
      component: 'mi-modal', // Nombre del componente del modal
    });
    modal.present();
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  onWillDismiss($event: any) {  }
  async abrirModal() {
    await this.modal.present(); // Abrir el ion-modal
  }

  //copiado de coleccion de pendientes a historial
  private pathDestino='Historial/';
  copiarColeccion(){
    this.firestore.copyCollection(this.path,this.pathDestino)
  }
  async mostrarActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones', // Encabezado del action sheet
      buttons: [
        {
          text: 'Entregado', // Opción de borrado
          icon: 'checkmark-done-outline',
          handler: () => {
            // Lógica para la opción de borrado
            console.log('Borrar seleccionado');
              this.copiarDoc();
              this.deleteNota()
          }
        },
        {
          text: 'Detalles del producto', // Opción de edición
          icon: 'add-outline',
          handler: ( ) => {
            // Lógica para la opción de edición
            this.abrirModal(); // Llamar al método editar() al hacer clic en la opción "Editar"
          }
        },
        {
          text: 'Cancelar', // Opción de cancelar
          icon: 'close',
          role: 'cancel',
          handler: () => {
            // Lógica para la opción de cancelar
            console.log('Cancelar seleccionado');
          }
        }
      ]
    });

    await actionSheet.present(); // Mostrar el action sheet
  }

  copiarDoc(){
    this.firestore.copiarDocumento(this.carro.id,this.path,this.pathDestino)
  }

  deleteDocumento(){
    this.firestore.deleteDoc(this.path,this.carro.id);
  }

  async deleteNota(){
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Entrega completada?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            this.deleteDocumento();
          }
        }
      ]
    });
    await alert.present();
  }


}
