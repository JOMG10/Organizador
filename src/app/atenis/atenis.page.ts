import {Component, OnInit, ViewChild} from '@angular/core';
import {FirestoreService} from "../services/firestore.service";
import {AlertController, IonModal, ModalController, PopoverController} from "@ionic/angular";

interface Tenis {
  nombre: string;
  descripcion: string;
  precio:string;
  colores:string;
  rutaImagen:string;
  id:string;
}

@Component({
  selector: 'app-atenis',
  templateUrl: './atenis.page.html',
  styleUrls: ['./atenis.page.scss'],
})
export class AtenisPage implements OnInit {

  private path = 'Tenis/';
  private pathAgregar='Carrito/';
  enableNewNota  = true;

  constructor(public firestore: FirestoreService, private modalController: ModalController,
              private popoverController: PopoverController, private alertController:AlertController) {
  }

  ngOnInit() {
    this.getActividad();
  }

  contenido:Tenis[] = [];
  act : Tenis = {
    nombre:'',
    descripcion:'',
    precio: '',
    colores: '',
    rutaImagen:'',
    id:this.firestore.getId()
  };

  getActividad(){
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

  tallas=[
    {talla:"25"},
    {talla:"26"},
    {talla:"27"},
    {talla:"28"},
    {talla:"29"},
    {talla:"30"},
    {talla:"21"},
  ]

  isModalClose =false;
  tallaSelecionada() {
    this.modalController.dismiss();
  }


  tallaSelecion="seleccionar talla"
  seleccionarTalla(){
    this.tallaSelecion = "25"
  }

  valor = 1

  async presentAlert() {
    this.valor=2

    const alert = await this.alertController.create({
      header: 'Carrito',
      subHeader: 'Se ha agregado un producto al carrito',
      message: '1 producto seleccionado',
      buttons: ['De acuerdo'],
    });

    await alert.present();
  }

  //agregar a carrito un producto selecionado por el cliente

  guardarNota(){
    this.firestore.creatDoc( this.act,this.pathAgregar, this.act.id);
  }


}
