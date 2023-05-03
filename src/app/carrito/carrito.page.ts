import {Component, OnInit, ViewChild} from '@angular/core';
import {FirestoreService} from "../services/firestore.service";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {ActionSheetController, AlertController, IonModal, ModalController, PopoverController} from "@ionic/angular";
interface Carrito {
  nombre: string;
  descripcion: string;
  precio:number;
  colores:string;
  rutaImagen:string;
  id:string;
}
interface Ventas{
  iva:number;
  subtotal:number;
  precioTotal:number;
  id:string;
  fecha:Date;
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


  //iniciador de progreso de carga

  ngOnInit() {
    this.getActividad();
  }

  private pathV='Venta/';
  contenidoV:Ventas[]=[];
  ventas:Ventas={
    iva:0,
    fecha: new Date(),
    subtotal:0,
    precioTotal:0,
    id:this.firestore.getId()
  }
  contenido:Carrito[] = [];
  carro : Carrito = {
    nombre:'',
    descripcion:'',
    precio: 0,
    colores: '',
    rutaImagen:'',
    id:this.firestore.getId()
  };
  getActividad(){
    this.firestore.getCollection<Carrito>(this.path).subscribe( res => {
      this.contenido = res;
    });
      this.firestore.getCollection<Ventas>(this.pathV).subscribe( res => {
        this.contenidoV = res;
    });
  }

  // calcular costo total a pagar
  registrarVenta() {
    this.firestore.sumarPreciosDocumentos(this.path,this.ventas.id,this.pathV,this.ventas.iva, this.ventas.subtotal)
  }
  registroTemporal() {
    this.firestore.sumarPreciosDocumentos(this.path,this.ventas.id,this.path,this.ventas.iva, this.ventas.subtotal)
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
  valor = 0
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
