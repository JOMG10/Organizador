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
  tallas:string;
}
interface usuario{
  nombre:string;
  telefono:string;
  direccion:string;
  correo:string;
  referencias:string;
  municipio:string;

}
interface Ventas{
  iva:number;
  subtotal:number;
  precioTotal:number;
  id:string;
  fecha:Date;
}
interface  CantidadCompras {
  campo:number;
  id:string;
}

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.page.html',
  styleUrls: ['./carrito.page.scss'],
})
export class CarritoPage implements OnInit {

  private path = 'Carrito/';
  private pathV='Venta/';
  private pathS='cantidadCompras/';

  public progress = 0;
  constructor(public firestore: FirestoreService, private modalController:ModalController,
              private popoverController:PopoverController, private alertController:AlertController
              ) {  }
  ngOnInit() {
    this.getActividad();
  }

  contenidoS:CantidadCompras[] = [];

  conted:CantidadCompras = {
    campo:0,
    id:this.firestore.getId()
  };

  usuarios:usuario[]=[];

  usuar:usuario={
    nombre:"",
    telefono:"",
    correo:"",
    direccion:"",
    referencias:"",
    municipio:""
}

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
    tallas:"",
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

  //iniciio de modal de carrito
  enableNewNota  = true;
  @ViewChild(IonModal) modal!: IonModal ;

  closeModal() {
    this.modalController.dismiss();
  }
  onWillDismiss($event: any) {  }

  campoExtraido: any;
  obtenerCampoDeColeccion() {
    const documentId = 'UBxkoP05c6JSNU6sCdud';

    this.firestore.obtenerCampoDeColeccion(this.pathS, documentId)
      .subscribe((docSnapshot) => {
        if (docSnapshot.exists) {
          this.campoExtraido = (docSnapshot.data() as any).campo;
          console.log('Valor del campo:', this.campoExtraido);
          // Realiza acciones adicionales con el campo obtenido
        } else {
          console.log('El documento no existe');
        }
      });
  }

  async abrirModal() {
    await this.modal.present(); // Abrir el ion-modal
  }

  async confirmarCarrito() {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: "Finalizar compra?",
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
            if(this.carro){
              this.closeModal()
              this.deleteCarrito()
              this.copiarColeccion()
              this.registrarVenta()
              this.cambiarC()
            }else{
              //alert("");
            }

          }
        }
      ]
    });
    await alert.present();
  }

  async presentToast(message: string) {
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: message,
      buttons: [
        {
          text: 'Aceptar',
          role: 'cancel',
          handler: () => {
          }
        }
      ]
    });
    await alert.present();
  }
  closePopover() {
    this.popoverController.dismiss();
  }

  private pathC = 'cantidadCompras/';

  registrarRestaCarrito(){
    this.firestore.guardarResta(this.pathC,this.documento);
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
  private documento ='UBxkoP05c6JSNU6sCdud';

  cambiarC() {

    this.firestore.cambiar(this.pathS,this.documento);
  }

  async deleteNota(){
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estas seguro de eliminar del carro de compra?',
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
            this.registrarRestaCarrito();
          }
        }
      ]
    });
    await alert.present();
  }

  deleteDocumento(){
    this.firestore.deleteDoc(this.path,this.carro.id);
  }
}
