import { Component } from '@angular/core';
import {ModalController} from "@ionic/angular";

interface DataItem {
  nombre: String;
  apellido:String;
}

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],

})

export class Tab3Page {


  constructor(public modalController: ModalController) {
  }

  visible = false;


  data: any;
  isVisible: any;
  currentSolicitud: any;


  showModal(i: any): void {
    this.isVisible = true;
  }

  segmentValue = 'option1'; // Valor por defecto del segmento
  closeModal() {
    this.modalController.dismiss();
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  nuevoItem = { nombre: '', apellido: '' }; // Variable para almacenar los datos del nuevo item


  async mostrarModal() {
    const modal = await this.modalController.create({
      component: 'mi-modal', // Nombre del componente del modal
    });
    modal.present();
  }

  cerrarModal() {
    this.modalController.dismiss();
  }

  guardarNuevoItem() {
    // Validar que se hayan llenado ambos campos del formulario
    if (this.nuevoItem.nombre && this.nuevoItem.apellido) {
      // Cerrar el modal y pasar los datos del nuevo item como resultado
      this.modalController.dismiss({ data: this.nuevoItem });
    }
  }


}
