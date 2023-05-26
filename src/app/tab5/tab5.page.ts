import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Router} from "@angular/router";
import {FirestoreService} from "../services/firestore.service";
import {AlertController} from "@ionic/angular";


interface Usuario {
  nombre: string;
  apellidos: string;
  contrasena:string;
  correo: string;
  whatsApp: number;
  id:string;
}

@Component({
  selector: 'app-tab5',
  templateUrl: './tab5.page.html',
  styleUrls: ['./tab5.page.scss'],
})
export class Tab5Page implements OnInit {

  constructor(private afAuth: AngularFireAuth, private router: Router, private firestore:FirestoreService,
              private alertController:AlertController) {
  }

  private pathU = 'Usuarios/';
  contenidoU: Usuario[] = [];
  Usua: Usuario = {
    nombre: '',
    apellidos: '',
    contrasena: '',
    correo: '',
    whatsApp: 0,
    id: this.firestore.getId()
  };

  getActividad() {
    this.firestore.getCollection<Usuario>(this.path).subscribe(res => {
      this.contenidoU = res;
    });
  }


  userData: any;

  ngOnInit() {
    this.getActividad();
  }


  logout() {
    this.afAuth.signOut().then(() => {
      this.firestore.clearUserData();

    }).catch((error) => {
      // Manejo de errores al cerrar sesión
      console.log('Error al cerrar sesión:', error);
    });
  }

  private path='UsuarioUso';
  borrarUsuario(){
    this.firestore.deleteCollection(this.path);
  }

  async deleteNota(){
    const alert = await this.alertController.create({
      header: 'Confirmar',
      message: '¿Estas seguro de cerrar sesion?',
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
            this.afAuth.signOut().then(() => {
              this.firestore.clearUserData();
              this.router.navigate(['/login']);
              this.borrarUsuario();
            })

           this.router.navigate(['/login']);
            this.borrarUsuario();
          }
        }
      ]
    });
    await alert.present();
  }

}
