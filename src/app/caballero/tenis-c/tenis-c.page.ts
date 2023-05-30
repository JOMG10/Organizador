import {Component, OnInit, ViewChild} from '@angular/core';
import {FirestoreService} from "../../services/firestore.service";
import {AlertController, IonModal, ModalController, PopoverController, ToastController} from "@ionic/angular";
import {AngularFirestore} from "@angular/fire/compat/firestore";

interface Tenis {
  nombre: string;
  descripcion: string;
  precio:number;
  colores:string;
  rutaImagen:string;
  id:string;
  tallas:string;
  marca:string;
  rutaImagen2:string
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
  private documento = 'UBxkoP05c6JSNU6sCdud';
  private pathC = 'cantidadCompras/';
  private pathAgregar = 'Carrito/';
  enableNewNota = true;

  constructor(public firestore: FirestoreService, private modalController: ModalController,
              private popoverController: PopoverController, private alertController: AlertController,
              private toastController: ToastController, private firestoreA: AngularFirestore) { }
              private toastController: ToastController) { }
  ngOnInit() {
    this.getActividad();
    this.firestoreA.collection('tenis', ref => ref.where('marca', '==', 'Nike'))
      .valueChanges()
      .subscribe((data: Tenis[]) => { // Asegúrate de especificar el tipo de datos en el método `subscribe`
        this.tenisCollection = data;
      });
  }

  tenisCollection: Tenis[]; // Define el tipo de datos como Tenis[]



  contenidoS: CantidadCompras[] = [];

  conted: CantidadCompras = {
    campo: 0,
    id: this.firestore.getId()
  };

  contenido: Tenis[] = [];
  act: Tenis = {
    nombre: '',
    marca:'',
    tallas: '',
    descripcion: '',
    precio: 0,
    colores: '',
    rutaImagen: '',
    rutaImagen2: '',
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

  public tallas: string[] = ['25', '25.5', '26', '26.5', '27', '27.5', '28', '28.5', '29', '29.5', '30'];
  public tallasM: string[] = ['22', '23.5', '23', '24.5', '24', '25.5', '25', '26.5', '26', '27.5', '27'];
  public tallasN: string[] = ['9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '13.5', '14', '14.5',
    '15', '15.5', '16', '17', '17.5', '18', '18.5', '19', '19.5', '20', '21.5', '22', '22.5'];
  public tallasG: string[] = ['9.5', '10', '10.5', '11', '11.5', '12', '12.5', '13', '13.5', '14', '14.5',
    '15', '15.5', '16', '17', '17.5', '18', '18.5', '19', '19.5', '20', '21.5', '22', '22.5'];

  tallaSelecion = "seleccionar talla"

  cambiar() {
    this.tallaSelecion = "seleccionar talla";
  }

  seleccionarTalla() {
      this.tallaSelecion = this.act.tallas;
  }

  /****ALERTA DE QUE ESTEN SELECCIONADA LAS TALLAS***/

  async presentAlertT() {
    const alert = await this.alertController.create({
      header: 'Carrito',
      subHeader: 'Campo vacio',
      message: 'El campo esta vacio debes seleccionar una talla',
      buttons: ['De acuerdo'],
    });

    await alert.present();
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
