import {Component, OnInit, ViewChild} from '@angular/core';
import {FirestoreService} from "../services/firestore.service";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {ActionSheetController, AlertController, IonModal, ModalController, PopoverController} from "@ionic/angular";
interface Carrito {
  nombre: string;
  descripcion: string;
  precio:string;
  colores:string;
  rutaImagen:string;
  id:string;
}
@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  private path = 'Carrito/';
  public progress = 0;
  constructor(public firestore: FirestoreService, private modalController:ModalController,
              private popoverController:PopoverController, private alertController:AlertController,
              private actionSheetCtrl: ActionSheetController
              ) {  }

 /* startProgress(){

    setInterval(() => {
      this.progress += 0.01;

      // Reset the progress bar when it reaches 100%
      // to continuously show the demo
      if (this.progress > 1) {
        setTimeout(() => {
          this.progress = 0;
        }, 1000);
      }
    }, 50);
  }*/ //iniciador de progreso de carga

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

  //iniciio de modal de carrito
  enableNewNota  = true;
  @ViewChild(IonModal) modal!: IonModal ;

  closeModal() {
    this.modalController.dismiss();
  }
  onWillDismiss($event: any) {  }
  async abrirModal() {
    await this.modal.present(); // Abrir el ion-modal
  }
  closePopover() {
    this.popoverController.dismiss();
  }

//mensaje de finalizacion de compra
  valor = 1
  async presentAlert() {
    this.valor=2

    const alert = await this.alertController.create({
      header: 'Carrito',
      subHeader: 'Tu compra se ha realizado correctamente',
      message: '1 producto seleccionado',
      buttons: ['De acuerdo'],
    });

    await alert.present();
  }


  //borrar el carrito de compras, para nuevo carrito
  async deleteCarrito(){
    this.firestore.deleteCollection(this.path);
  }

  //agregar el carrito de compra a pendientes
  private pathDestino='Pendientes/';
  copiarColeccion(){
    this.firestore.copyCollection(this.path,this.pathDestino)
  }





  /*actionShet de borrar, editar y eliminar
 async mostrarActionSheet() {
   const actionSheet = await this.actionSheetCtrl.create({
     header: 'Opciones', // Encabezado del action sheet
     buttons: [
       {
         text: 'Editar', // Opción de edición
         icon: 'create',
         handler: ( ) => {
           // Lógica para la opción de edición
           this.abrirModal(); // Llamar al método editar() al hacer clic en la opción "Editar"
         }
       },
       {
         text: 'Borrar', // Opción de borrado
         icon: 'trash',
         handler: () => {
           // Lógica para la opción de borrado
           console.log('Borrar seleccionado');
           this.deleteNota(this.carro);
         }
       },
       {
         text: 'completado', // Opción de completado
         icon: 'checkmark-outline',
         handler: () => {
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

  */


}
