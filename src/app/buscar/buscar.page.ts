import {Component, OnInit, ViewChild} from '@angular/core';
import {AngularFirestore} from "@angular/fire/compat/firestore";
import {map, Observable, Subscription} from "rxjs";
import { combineLatest } from 'rxjs';
import {FirestoreService} from "../services/firestore.service";
import {AlertController, IonModal, ModalController} from "@ionic/angular";

interface Tenis {
  nombre: string;
  descripcion: string;
  precio:number;
  colores:string;
  rutaImagen:string;
  id:string;
  categoria:string;
  tallas:string;
}
@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.page.html',
  styleUrls: ['./buscar.page.scss'],
})
export class BuscarPage implements OnInit {

  private documento = 'UBxkoP05c6JSNU6sCdud';
  private pathC = 'cantidadCompras/';
  private pathAgregar = 'Carrito/';
  private path = 'Tenis/';
  private path2 = 'TenisD/';
  private path3 = 'TenisG/';
  private path4 = 'TenisB/';
  private path5 = 'Zapatos/';
  private path6 = 'ZapatosD/';
  private path7 = 'ZapatosG/';
  private path8 = 'ZapatosB/';
  users:any = [];

  nombre:"";
  contenido:Tenis[] = [];
  act : Tenis = {
    nombre:'',
    descripcion:'',
    precio: 0,
    tallas:'',
    categoria:'',
    colores: '',
    rutaImagen:'',
    id:this.firestore.getId()
  };
  constructor(private afs: AngularFirestore, private firestore: FirestoreService,
              private alertController:AlertController,  private modalController: ModalController) {}

  ngOnInit() {
    this.getActividad();
  }
  getActividad(){
    this.firestore.getCollection<Tenis>(this.path).subscribe( res => {
      this.contenido = res;
    });
  }
  buscar(event) {
    console.log(event);
  }
  searchQuery: string;
  searchResults: any[];
  performSearch() {
    if (this.searchQuery && this.searchQuery.trim() !== '') {
      this.firestore.search(this.searchQuery,this.path,this.path2,this.path3,this.path4,
        this.path5,this.path6,this.path7,this.path8)

        .subscribe(
          (results) => {
            this.searchResults = results;
          },
          (error) => {
            console.error(error);
          }
        );
    } else {
      // Vaciar los resultados si no hay un término de búsqueda válido
      this.searchResults = [];
    }
  }


  @ViewChild(IonModal) modal!: IonModal ;
  enableNewNota: true;

  async abrirModal() {
    await this.modal.present(); // Abrir el ion-modal
  }

  onWillDismiss($event: any) {
  }
  isModalOpen = false;
  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  /******************INICIO MODAL DE BUSQUEDAA****************************/

  public tallas: string[] = ['25', '25.5', '26', '26.5', '27', '27.5', '28', '28.5', '29', '29.5', '30'];

  closeModal() {
    this.modalController.dismiss();
  }

  abrirModall = false;
  setOpenn(isOpen: boolean) {
    this.abrirModall = isOpen;
  }

  tallaSelecion = "seleccionar talla"

  cambiar() {
    this.tallaSelecion = "seleccionar talla";
  }
  seleccionarTalla() {
    this.tallaSelecion = this.act.tallas;
  }

  guardarNota(){
    this.firestore.creatDoc( this.act,this.pathAgregar, this.act.id);
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
              //this.presentToast('Para agregar al carrito es necesario que selecciones una talla');
            } else {
              this.setOpenn(false);
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
}
