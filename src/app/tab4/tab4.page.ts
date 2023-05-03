import { Component, OnInit } from '@angular/core';
import {FirestoreService} from "../services/firestore.service";
import {ActionSheetController, AlertController, ModalController} from "@ionic/angular";

interface Historial {
  nombre: string;
  descripcion: string;
  precio:string;
  colores:string;
  rutaImagen:string;
  id:string;
}


@Component({
  selector: 'app-tab4',
  templateUrl: './tab4.page.html',
  styleUrls: ['./tab4.page.scss'],
})
export class Tab4Page implements OnInit {

  private path="Historial/"
  constructor(private firestore:FirestoreService, private actionSheetCtrl: ActionSheetController,
              private alertController: AlertController) { }

  ngOnInit() {
    this.getActividad();
  }

  contenido: Historial [] = [];

  carro:Historial = {
    nombre: '',
    descripcion: '',
    precio:'',
    colores:'',
    rutaImagen:'',
    id:this.firestore.getId()
  };

  getActividad(){
    this.firestore.getCollection<Historial>(this.path).subscribe( res => {
      this.contenido = res;
    });  }

  onWillDismiss($event: any) {

  }
  async deleteHistorial(){
    this.firestore.deleteCollection(this.path);
  }

  cancel() {
  }
  protected readonly confirm = confirm;

  //inicio del action shet para eliminar

 async mostrarActionSheet() {
   const actionSheet = await this.actionSheetCtrl.create({
     header: 'Opciones', // Encabezado del action sheet
     buttons: [
       {
         text: 'Borrar', // Opción de borrado
         icon: 'trash',
         handler: () => {
           // Lógica para la opción de borrado
           console.log('Borrar seleccionado');
           this.deleteNota(this.carro);
         }
       },
       {
         text: 'Borrar Todo', // Opción de completado
         icon: 'checkmark-outline',
         handler: () => {
           this.deleteTodo();
         }
       },
       {
         text: 'Cancelar', // Opción de cancelar
         icon: 'close',
         role: 'cancel',
         handler: () => {
           // Lógica para la opción de cancelar
           console.log('Cancelar seleccionado');
         }
       }
     ]
   });

   await actionSheet.present(); // Mostrar el action sheet
 }

  async deleteNota(historial: Historial){
    const alert = await this.alertController.create({
      header: 'Confirmar borrado',
      message: '¿Estás seguro de que quieres borrar este elemento?',
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
            this.firestore.deleteDoc(this.path,historial.id);
          }
        }
      ]
    });
    await alert.present();
  }


  async deleteTodo(){
    const alert = await this.alertController.create({
      header: 'Confirmar borrado',
      message: '¿Estás seguro de que quieres borrar este elemento?',
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
            this.deleteHistorial();
          }
        }
      ]
    });
    await alert.present();
  }
}
