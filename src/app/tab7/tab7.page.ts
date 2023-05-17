import {Component, OnInit, ViewChild} from '@angular/core';
import {IonModal, ModalController} from "@ionic/angular";

@Component({
  selector: 'app-tab7',
  templateUrl: './tab7.page.html',
  styleUrls: ['./tab7.page.scss'],
})
export class Tab7Page implements OnInit {
  enableNewNota: any;
  @ViewChild(IonModal) modal!: IonModal ;


  constructor(public modalController: ModalController) {

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
  }


  onWillDismiss($event: any) {

  }

  closeModal() {

  }
}
