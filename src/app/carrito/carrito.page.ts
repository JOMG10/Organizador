import {Component, OnInit, ViewChild} from '@angular/core';
import {FirestoreService} from "../services/firestore.service";
import {AlertController, IonModal, ModalController, PopoverController} from "@ionic/angular";


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
              ) {

  }



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


  //


}
