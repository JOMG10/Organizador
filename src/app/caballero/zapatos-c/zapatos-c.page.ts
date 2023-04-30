import {Component, OnInit, ViewChild} from '@angular/core';
import {FirestoreService} from "../../services/firestore.service";
import {AlertController, IonModal, ModalController, PopoverController} from "@ionic/angular";

interface Zapatos {
  nombre: string;
  descripcion: string;
  precio:number;
  colores:string;
  rutaImagen:string;
  id:string;
}

@Component({
  selector: 'app-zapatos-c',
  templateUrl: './zapatos-c.page.html',
  styleUrls: ['./zapatos-c.page.scss'],
})
export class ZapatosCPage implements OnInit {
  private path = 'Zapatos/';
  private pathAgregar='Carrito/';
  enableNewNota  = true;

  constructor(public firestore: FirestoreService, private modalController: ModalController,
              private popoverController: PopoverController, private alertController:AlertController) {
  }

  ngOnInit() {
    this.getActividad();
  }

  contend:Zapatos[] = [];
  act : Zapatos = {
    nombre:'',
    descripcion:'',
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

  guardarNotaZ(){
    this.firestore.creatDoc( this.act,this.pathAgregar, this.act.id);
  }
}
