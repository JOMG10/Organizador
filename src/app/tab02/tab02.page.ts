import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {FirestoreService} from "../services/firestore.service";
import {AlertController, IonModal, ModalController} from "@ionic/angular";

interface Zapatos {
  nombre: string;
  descripcion: string;
  precio:number;
  colores:string;
  rutaImagen:string;
  id:string;
  tallas:string
}
@Component({
  selector: 'app-tab02',
  templateUrl: './tab02.page.html',
  styleUrls: ['./tab02.page.scss'],
})
export class Tab02Page implements OnInit {

  private documento = 'UBxkoP05c6JSNU6sCdud';
  private pathC = 'cantidadCompras/';
  private pathAgregar = 'Carrito/';
  private path = 'Zapatos/';

  constructor(private router: Router,private firestore:FirestoreService,private modalController:ModalController,
              private alertController:AlertController) {}
  ngOnInit(): void{
    this.getActividad();
    this.RecomendadoParaTi();
    this.recomendadoD();
  }

  contend:Zapatos[] = [];
  act : Zapatos = {
    nombre:'',
    descripcion:'',
    tallas:'',
    precio: 0,
    colores: '',
    rutaImagen:'',
    id:this.firestore.getId()
  };
  getActividad(){
    this.firestore.getCollection<Zapatos>(this.path).subscribe( res => {
      this.contend = res;
    });
  }



  //contenido de las seleccione de niño, niña, dama y caballero

  categorias = [
    { id: 1, nombre: 'Hombres', imagen: 'assets/img/hombre.jpg' },
    { id: 2, nombre: 'Mujeres', imagen: 'assets/img/women.jpg' },
    { id: 3, nombre: 'Niños', imagen: 'assets/img/kids.jpg' },
    { id: 4, nombre: 'Niñas', imagen: 'assets/img/portadas/niña_portada.png' }
  ];

  //contenido de los tenis para caballero
  modelos = [
    { id: 1, nombre: 'Tenis', link:"/caballero/tenis-c" },
    { id: 2, nombre: 'Zapatos', link: "/caballero/zapatos-c" }
  ];

  segmentValue = 'option1'; // Valor por defecto del segmento

  verProductos() {
    this.router.navigateByUrl('/productos');
  }

  //comienza el contenido de los tenis para DAMA

  modelosD = [
    { id: 1, nombre: 'Tenis', link:"/dama/tenis-d" },
    { id: 2, nombre: 'Zapatos', link: "/dama/zapatos-d" }
  ];

  //comienza el contenido de los tenis para NIÑO

  modelosB = [
    { id: 1, nombre: 'Tenis', link:"/boys/tenis-b" },
    { id: 2, nombre: 'Zapatos', link: "/boys/zapatos-b" }
  ];


  //comienza el contenido de los tenis para NIÑA

  modelosG = [
    { id: 1, nombre: 'Tenis', link:"/bgirls/tenis-g" },
    { id: 2, nombre: 'Zapatos', link: "/bgirls/zapatos-g" }
  ];

  //comienzo de recomendaD
  colecciones:string [] = ['Zapatos', 'Tenis','TenisB','ZapatosB'];
  recomendado: any[] = [];

  RecomendadoParaTi() {
    this.colecciones.forEach((collectionName) => {
      this.firestore.getRandomDocumentFromCollection(collectionName).subscribe((randomDocument) => {
        this.recomendado.push(randomDocument);
      });
    });
  }

  //recomendado para ti dama
  coleccionDama:string [] = ['ZapatosD', 'TenisD','TenisG','ZapatosG'];
  recomendadoDama: any[] = [];

  recomendadoD() {
    this.coleccionDama.forEach((collectionName) => {
      this.firestore.getRandomDocumentFromCollection(collectionName).subscribe((randomDocument) => {
        this.recomendadoDama.push(randomDocument);
      });
    });
  }
  @ViewChild(IonModal) modal!: IonModal ;
  enableNewNota: true;
  async abrirModal() {
    await this.modal.present(); // Abrir el ion-modal
  }
  closeModal() {
    this.modalController.dismiss();
  }
  public tallas: string[] = ['25', '25.5', '26', '26.5', '27', '27.5', '28', '28.5', '29', '29.5', '30'];

  tallaSelecion = "seleccionar talla"
  isModalOpen = false;

  cambiar() {
    this.tallaSelecion = "seleccionar talla";
  }
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  seleccionarTalla() {
    this.tallaSelecion = this.act.tallas;
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

  guardarNota(){
    this.firestore.creatDoc( this.act,this.pathAgregar, this.act.id);
  }
  registrarSumaCarrito() {
    this.firestore.guardarSuma(this.pathC, this.documento);
  }
  valor=0
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


  onWillDismiss($event: any) {

  }
}
