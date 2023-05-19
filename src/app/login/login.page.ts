import { Component, OnInit } from '@angular/core';
import {FirestoreService} from "../services/firestore.service";
import {Router} from "@angular/router";
import {AngularFireAuth} from "@angular/fire/compat/auth";

interface Usuario {
  nombre: string;
  apellidos: string;
  contrasena:string;
  correo: string;
  telefono: number;
  id:string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private firestore: FirestoreService, private router: Router, private afAuth: AngularFireAuth) {
  }
  documentId: string;


  ngOnInit() {
    this.getUsuario();

  }

  private pathU = 'Usuarios/';
  contenidoU: Usuario[] = [];
  Usua: Usuario = {
    nombre: '',
    apellidos: '',
    contrasena: '',
    correo: '',
    telefono: 0,
    id: this.firestore.getId()
  };

  getUsuario() {
    this.firestore.getCollection<Usuario>(this.pathU).subscribe(res => {
      this.contenidoU = res;
    });
  }

  async deleteCarrito(){
    this.firestore.deleteCollection(this.pathU);
  }

  //agregar el carrito de compra a pendientes


  errorMessage: string;
  nombre: string;
  contrasena: string;
  documentoCopiado: any;


  login(): void {
    if (!this.nombre || !this.contrasena) {
      this.errorMessage = 'Por favor, ingresa un nombre de usuario y una contraseña';
      return;
    }

   this.firestore.getUserByEmail(this.nombre, this.contrasena, this.pathU)
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          if (this.nombre) {
            this.firestore
              .copyDocumentByName('Usuarios', 'UsuarioUso', this.nombre)
              .then(() => {
                console.log('Documento copiado exitosamente');
              })
              .catch((error) => {
                console.error('Error al copiar el documento:', error);
              });
          } else {
            console.error('Por favor, ingresa un nombre válido');
          }
          this.router.navigate(['/tabs']); // Redirecciona al usuario a la página deseada
        } else {
          this.errorMessage = 'El usuario no existe';
        }
      })
  }



}
