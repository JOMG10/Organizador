import {Component, OnInit, ViewChild} from '@angular/core';
import {ActionSheetController, AlertController, IonModal, ModalController, PopoverController,} from "@ionic/angular";
import {FirestoreService} from "../services/firestore.service";
import {NgForm} from "@angular/forms";

interface Actividad {
  title: string;
  nota: string;
  fecha: Date;
  import: boolean;
  id:string;
  check: boolean;
}
interface Usuario {
  nombre: string;
  apellidos: string;
  contrasena:string;
  correo: string;
  whatsApp: number;
  id:string;
}
interface Tenis {
  nombre: string;
  descripcion: string;
  precio:number;
  colores:string;
  rutaImagen:string;
  id:string;
}

interface Zapato {
  nombre: string;
  descripcion: string;
  precio:number;
  colores:string;
  rutaImagen:string;
  id:string;
}
interface Sandalias {
  nombre: string;
  descripcion: string;
  precio:number;
  colores:string;
  rutaImagen:string;
  id:string;
}

@Component({
  selector: 'app-formulario',
  templateUrl: './formulario.page.html',
  styleUrls: ['./formulario.page.scss'],
})
export class FormularioPage implements OnInit {

  private path = 'Tenis/';

  import: boolean = false; // Variable para almacenar el estado del checkbox
  isChecked: boolean = false; // Variable para almacenar el estado del checkbox
  enableNewNota  = true;
  visible = false;
  data: any;



  constructor( private actionSheetCtrl: ActionSheetController,private alertController: AlertController,
               private modalController: ModalController, public firestore: FirestoreService,
               private popoverController: PopoverController) {

  }
  ngOnInit() {
    this.getActividad();
    this. getActividadZ();
    this.getActividadS();
    this.getUsuario();
  }

  username: string;
  password: string;

  register() {
    // Aquí implementa la lógica para registrar el nuevo usuario
    console.log('Registrando usuario:', this.username);
    console.log('Contraseña:', this.password);

    // Aquí puedes agregar la lógica adicional, como hacer una solicitud HTTP para registrar el usuario en tu backend
  }

  //contenido de usuarios /************************************************************************/
  private pathU = 'Usuarios/';
  contenidoU:Usuario[] = [];
  Usua : Usuario = {
    nombre:'',
    apellidos:'',
    contrasena: '',
    correo: '',
    whatsApp:0,
    id:this.firestore.getId()
  };

  getUsuario(){
    this.firestore.getCollection<Usuario>(this.pathU).subscribe( res => {
      this.contenidoU = res;
    });
  }

  nuevoUsuario() {
    this.enableNewNota = true;
    this.Usua  = {
      nombre:'',
      apellidos:'',
      contrasena: '',
      correo: '',
      whatsApp:0,
      id:this.firestore.getId()
    };
  }

  guardarUsuario(){
    this.firestore.creatDoc( this.Usua,this.pathU, this.Usua.id);
  }




  /*********************************************************************************/
  //comienza agrega a tenis
  contenido:Tenis[] = [];
  act : Tenis = {
    nombre:'',
    descripcion:'',
    precio: 0,
    colores: '',
    rutaImagen:'',
    id:this.firestore.getId()
  };
  getActividad(){
    this.firestore.getCollection<Tenis>(this.path).subscribe( res => {
      this.contenido = res;
    });
  }
  nuevo() {
    this.enableNewNota = true;
    this.act  = {
      nombre:'',
      descripcion:'',
      precio: 0,
      colores: '',
      rutaImagen:'',
      id:this.firestore.getId()
    };
  }

  /////////////contenido de zapato
  private pat = 'Zapatos/';
  contendZ:Zapato[] = [];
  Zap : Zapato = {
    nombre:'',
    descripcion:'',
    precio: 0,
    colores: '',
    rutaImagen:'',
    id:this.firestore.getId()
  };

  getActividadZ(){
    this.firestore.getCollection<Zapato>(this.pat).subscribe( res => {
      this.contendZ = res;
    });
  }

  nuevoZ() {
    this.enableNewNota = true;
    this.Zap  = {
      nombre:'',
      descripcion:'',
      precio: 0,
      colores: '',
      rutaImagen:'',
      id:this.firestore.getId()
    };
  }

  guardarNotaZ(){
    this.firestore.creatDoc( this.Zap,this.pat, this.Zap.id);
  }

  ////////aqui empieza el contenidpo de las sandalias


  private pathS = 'Sandalias/';
  contenidoS:Sandalias[] = [];
  San : Sandalias = {
    nombre:'',
    descripcion:'',
    precio: 0,
    colores: '',
    rutaImagen:'',
    id:this.firestore.getId()
  };

  getActividadS(){
    this.firestore.getCollection<Sandalias>(this.pathS).subscribe( res => {
      this.contenidoS = res;
    });
  }

  nuevoS() {
    this.enableNewNota = true;
    this.San = {
      nombre:'',
      descripcion:'',
      precio: 0,
      colores: '',
      rutaImagen:'',
      id:this.firestore.getId()
    };
  }

  guardarNotaS(){
    this.firestore.creatDoc( this.San,this.pathS, this.San.id);
  }






 // ngOnInit() { this.getActividad(); }

  guardarNota(){
      this.firestore.creatDoc( this.act,this.path, this.act.id);
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
