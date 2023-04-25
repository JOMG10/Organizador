import {Component, OnInit, ViewChild} from '@angular/core';
import {ActionSheetController, AlertController, IonModal, ModalController, PopoverController,} from "@ionic/angular";
import {FirestoreService} from "../services/firestore.service";
import {Actividad} from "../models";
import {NgForm} from "@angular/forms";


@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  import: boolean = false; // Variable para almacenar el estado del checkbox
  isChecked: boolean = false; // Variable para almacenar el estado del checkbox
  enableNewNota  = true;
  visible = false;
  data: any;
  valor:Date=new Date();

  private path = 'FormularioNotas/';

  constructor( private actionSheetCtrl: ActionSheetController,private alertController: AlertController,
               private modalController: ModalController, public firestore: FirestoreService,
               private popoverController: PopoverController) {

  }
  notas:Actividad[] = [];
  act : Actividad = {
    title:'',
    nota:'',
    fecha: "",
    import: false,
    check:false,
    id:this.firestore.getId()
  };

  cambiarFecha(){

    }




  ngOnInit() { this.getActividad(); }

  guardarNota(){
      this.firestore.creatDoc( this.act,this.path, this.act.id);
  }

  getActividad(){
    this.firestore.getCollection<Actividad>(this.path).subscribe( res => {
      this.notas = res;
    });
  }

  async mostrarActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones', // Encabezado del action sheet
      buttons: [
        {
          text: 'Editar', // Opción de edición
          icon: 'create',
          handler: ( ) => {
            // Lógica para la opción de edición
            this.abrirModal(); // Llamar al método editar() al hacer clic en la opción "Editar"
          }
        },
        {
          text: 'Borrar', // Opción de borrado
          icon: 'trash',
          handler: () => {
            // Lógica para la opción de borrado
            console.log('Borrar seleccionado');
            this.deleteNota(this.act);
          }
        },
        {
          text: 'completado', // Opción de completado
          icon: 'checkmark-outline',
          handler: () => {
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


  async borrar() {
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
          handler: (index:number) => {
          }
        }
      ]
    });

    await alert.present();
  }

  @ViewChild(IonModal) modal!: IonModal ;

  closeModal() {
    this.modalController.dismiss();
  }
  onWillDismiss($event: any) {  }

  nuevo() {
    this.enableNewNota = true;
    this.act  = {
      title:'',
      nota:'',
      fecha: "hola",
      import: false,
      check:false,
      id:this.firestore.getId()
    };
  }

  // Función para abrir el modal

  async abrirModal() {
    await this.modal.present(); // Abrir el ion-modal
   }

  async deleteNota(actividad: Actividad){
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
            this.firestore.deleteDoc(this.path,actividad.id);
            this.nuevo();
          }
        }
      ]
    });
    await alert.present();
  }

  importante() {
    if (this.import) {
      console.log('El checkbox está marcado.');
      // Puedes agregar aquí la lógica de validación que desees
    } else {
      console.log('El checkbox no está marcado.');
      // Puedes agregar aquí la lógica de validación que desees
    }
  }


  closePopover() {
    this.popoverController.dismiss();
  }

  guardarDatos(formulario: NgForm) {
    if (formulario.valid) {
      // Realizar acciones para guardar los datos del formulario
      console.log('Formulario válido. Datos guardados:', formulario.value);
    } else {
      console.log('Formulario inválido. No se han ingresado todos los datos.');
    }
  }
}
