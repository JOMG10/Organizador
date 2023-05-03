import {Component, OnInit, ViewChild} from '@angular/core';
import {FirestoreService} from "../../services/firestore.service";
import {AlertController, IonModal, ModalController, PopoverController} from "@ionic/angular";
import {AngularFirestore, AngularFirestoreDocument} from "@angular/fire/compat/firestore";
import {Observable} from "rxjs";
import { map } from 'rxjs/operators';



interface Tenis {
  nombre: string;
  descripcion: string;
  precio:number;
  colores:string;
  rutaImagen:string;
  id:string;
  tallas:string;
}

interface CantidadCompras{
  campo:number;
  id:string;
}

@Component({
  selector: 'app-tenis-c',
  templateUrl: './tenis-c.page.html',
  styleUrls: ['./tenis-c.page.scss'],
})
export class TenisCPage implements OnInit {


  private path = 'Tenis/';
  private documento ='UBxkoP05c6JSNU6sCdud';
  private pathC = 'cantidadCompras/';
  private pathAgregar='Carrito/';
  enableNewNota  = true;

  constructor(public firestore: FirestoreService, private modalController: ModalController,
              private popoverController: PopoverController, private alertController:AlertController) {
  }


  ngOnInit() {
    this.getActividad();
  }

  contenidoS:CantidadCompras[] = [];

  conted:CantidadCompras = {
    campo:0,
    id:this.firestore.getId()
  };

  contenido:Tenis[] = [];
  act : Tenis = {
    nombre:'',
    tallas:'',
    descripcion:'',
    precio: 0,
    colores: '',
    rutaImagen:'',
    id:this.firestore.getId()
  };

  modificarCarrito() {
    this.firestore.agregarColeccion(this.conted.campo++, this.pathC, this.documento );
  }

  getActividad(){
    this.firestore.getCollection<CantidadCompras>(this.pathC).subscribe(res=> {
      this.contenidoS = res
    });
    this.firestore.getCollection<Tenis>(this.path).subscribe( res => {
      this.contenido = res;
    });
  }

  //inicio del modal
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

  //contenido del modal

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  //inicio de modal de tallas

  public tallas: string[] = ['36', '37', '38', '39', '40'];

  /*tallaSelecionada() {
    this.modalController.dismiss();
  }*/
  tallaSelecion = "seleccionar talla"

  cambiar(){
    this.tallaSelecion= "seleccionar talla";
  }

  seleccionarTalla(){
    this.tallaSelecion = this.act.tallas;
  }

  valor = 0

  async presentAlert() {
    this.valor= this.valor +1


    const alert = await this.alertController.create({
      header: 'Carrito',
      subHeader: 'Se ha agregado un producto al carrito',
      message: '1 producto seleccionado',
      buttons: ['De acuerdo'],
    });

    await alert.present();
  }

  async agregarCarro(){
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estás seguro de que quieres agregar al carrito de compra?',
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
            this.closeModal();
            this.guardarNota();
            this.modificarCarrito();
            this.cambiar();
            this.presentAlert();
          }
        }
      ]
    });
    await alert.present();
  }

  //agregar a carrito un producto selecionado por el cliente

  guardarNota(){
    this.firestore.creatDoc( this.act,this.pathAgregar, this.act.id);
  }
}
