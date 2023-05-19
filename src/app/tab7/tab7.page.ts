import {Component, OnInit, ViewChild} from '@angular/core';
import {IonModal, ModalController} from "@ionic/angular";
import {FirestoreService} from "../services/firestore.service";

interface AcercaD{
  nombre:string;
  correo:string;
  rutaImagen:string;
  id:string;
  whatsApp:number
  github:string

}
@Component({
  selector: 'app-tab7',
  templateUrl: './tab7.page.html',
  styleUrls: ['./tab7.page.scss'],
})
export class Tab7Page implements OnInit {
  enableNewNota: any;
  @ViewChild(IonModal) modal!: IonModal;


  constructor(public modalController: ModalController,private firestore:FirestoreService) {

  }

  async mostrarModal() {
    const modal = await this.modalController.create({
      component: 'mi-modal', // Nombre del componente del modal
    });
    modal.present();
  }

  isVisible: any;

  showModal(i: any): void {
    this.isVisible = true;
  }

  async abrirModal() {
    await this.modal.present(); // Abrir el ion-modal
  }

  ngOnInit() {
    this.getActividad();
  }



  onWillDismiss($event: any) {

  }

  closeModal() {

  }

  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  private path="UsuariosUso/"

   acerc:AcercaD[]=[];
  Acerca: AcercaD= {
    nombre:'',
    correo:'',
    rutaImagen:'',
    whatsApp:0,
    github:'',
    id:this.firestore.getId()
  }

  getActividad() {
    this.firestore.getCollection<AcercaD>(this.path).subscribe(res => {
      this.acerc = res
    });

  }





}
