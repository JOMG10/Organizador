import {Component, OnInit, ViewChild} from '@angular/core';
import {FirestoreService} from "../../services/firestore.service";
import {AlertController, IonModal, ModalController, PopoverController, ToastController} from "@ionic/angular";

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
  selector: 'app-zapatos-d',
  templateUrl: './zapatos-d.page.html',
  styleUrls: ['./zapatos-d.page.scss'],
})
export class ZapatosDPage implements OnInit {
  private path = 'ZapatosD/';
  private documento = 'UBxkoP05c6JSNU6sCdud';
  private pathC = 'cantidadCompras/';
  private pathAgregar = 'Carrito/';
  enableNewNota = true;

  constructor(public firestore: FirestoreService, private modalController: ModalController,
              private popoverController: PopoverController, private alertController: AlertController,
              private toastController: ToastController) {
  }


  ngOnInit() {
    this.getActividad();
  }

  contenidoS: CantidadCompras[] = [];

  conted: CantidadCompras = {
    campo: 0,
    id: this.firestore.getId()
  };

  contenido: Tenis[] = [];
  act: Tenis = {
    nombre: '',
    tallas: '',
    descripcion: '',
    precio: 0,
    colores: '',
    rutaImagen: '',
    id: this.firestore.getId()
  };

  getActividad() {
    this.firestore.getCollection<CantidadCompras>(this.pathC).subscribe(res => {
      this.contenidoS = res
    });
    this.firestore.getCollection<Tenis>(this.path).subscribe(res => {
      this.contenido = res;
    });
  }

  registrarSumaCarrito() {
    this.firestore.guardarSuma(this.pathC, this.documento);
  }


  //inicio del modal
  @ViewChild(IonModal) modal!: IonModal;

  closeModal() {
    this.modalController.dismiss();
  }

  onWillDismiss($event: any) {
  }

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

  public tallas: string[] = ['22', '23.5', '23', '24.5', '24', '25.5', '25', '26.5', '26', '27.5', '27'];

  tallaSelecion = "seleccionar talla"

  cambiar() {
    this.tallaSelecion = "seleccionar talla";
  }

  seleccionarTalla() {
    this.tallaSelecion = this.act.tallas;
  }

  valor = 0

  async presentAlert() {
    this.valor = this.valor + 1


    const alert = await this.alertController.create({
      header: 'Carrito',
      subHeader: 'Se ha agregado un producto al carrito',
      message: '1 producto seleccionado',
      buttons: ['De acuerdo'],
    });

    await alert.present();
  }

  async agregarCarro() {
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
            if (this.tallaSelecion === "seleccionar talla") {
              this.presentToast('Para agregar al carrito es necesario que selecciones una talla');
            } else {
              this.closeModal();
              this.guardarNota();
              //this.modificarCarrito();
              this.cambiar();
              this.presentAlert();
              this.registrarSumaCarrito();
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

  //agregar a carrito un producto selecionado por el cliente

  guardarNota(){
    this.firestore.creatDoc( this.act,this.pathAgregar, this.act.id);
  }
}
