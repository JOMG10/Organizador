import {Component, OnInit, ViewChild} from '@angular/core';
import { ModalController,IonModal,IonSlides, PopoverController,AlertController, ToastController
} from '@ionic/angular';
import {FirestoreService} from "../services/firestore.service"
interface Zapatos {
  nombre: string;
  descripcion: string;
  precio:number;
  colores:string;
  rutaImagen:string;
  id:string;
  tallas:string
  descuento: number;
}

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  isVisible = false;
  fechaActual: Date;
  private documento = 'UBxkoP05c6JSNU6sCdud';
  private pathC = 'cantidadCompras/';
  private pathAgregar = 'Carrito/';

  //constructor
  constructor(public firestore: FirestoreService, private modalController: ModalController,
              private popoverController: PopoverController, private alertController: AlertController,
              private toastController: ToastController) {
    this.fechaActual=new Date();
  }
  ngOnInit(): void {
    this.getActividad();
    this.getRandomDocument();
    this.RecomendadoParaTi();
  }

  //contenido de selecciones destacadas para ti
  contend:Zapatos[] = [];
  act : Zapatos = {
    nombre:'',
    descripcion:'',
    tallas:'',
    precio: 0,
    colores: '',
    descuento:0,
    rutaImagen:'',
    id:this.firestore.getId()
  };
  getActividad(){
    this.firestore.getCollection<Zapatos>(this.path).subscribe( res => {
      this.contend = res;
    });
  }
  collectionNames: string[] = ['Zapatos', 'Tenis', 'TenisD','ZapatosD','TenisG','TenisB','ZapatosG','ZapatosB'];
  randomDocuments: any[] = [];
  getRandomDocument() {
    this.collectionNames.forEach((collectionName) => {
      this.firestore.getRandomDocumentFromCollection(collectionName).subscribe((randomDocument) => {
        this.randomDocuments.push(randomDocument);
      });
    });
  }
  colecciones:string [] = ['Zapatos', 'Tenis','TenisB','ZapatosB'];
  recomendado: any[] = [];
  RecomendadoParaTi() {
    this.colecciones.forEach((collectionName) => {
      this.firestore.getRandomDocumentFromCollection(collectionName).subscribe((randomDocument) => {
        this.recomendado.push(randomDocument);
      });
    });
  }
  public tallas: string[] = ['25', '25.5', '26', '26.5', '27', '27.5', '28', '28.5', '29', '29.5', '30'];
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

  cambiar() {
    this.tallaSelecion = "seleccionar talla";
  }

  tallaSelecion = "seleccionar talla"

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

  registrarSumaCarrito() {
    this.firestore.guardarSuma(this.pathC, this.documento);
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

  guardarNota(){
    this.firestore.creatDoc( this.act,this.pathAgregar, this.act.id);
  }
  @ViewChild('slideRef', { static: true }) slide: IonSlides;

  slideNext() {
    this.slide.slideNext();
  }
  isModalOpen = false;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }
  seleccionarTalla() {
    this.tallaSelecion = this.act.tallas;
  }
}
