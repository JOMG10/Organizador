import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {FirestoreService} from "../services/firestore.service";
import {getBoolean} from "@angular/fire/remote-config";

interface CantidadCompras{
  campo:number;
  id:string;
}

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  constructor(public firestore: FirestoreService ) {
  }

  ngOnInit() {
    this.getActividadC();
  }

  INICIO = "INICIO";
  OPCION1 = "OPCION_1"
  OPCION2 = "OPCION_2"
  OPCION3 = "OPCION_3"
  OPCION4 = "OPCION_4"
  OPCION5 = "OPCION_5"
  OPCION6 = "OPCION_6"

  opcion = this.INICIO
  nombre="INICIO";
  cambiarInicio() {this.nombre = "INICIO";}
  cambiarCalendario() {this.nombre = "COMPRAS";}
  cambiarPendiente() {this.nombre = "MIS PEDIDOS";}
  cambiarHorario() {this.nombre = "HISTORIAL";}
  cambiarPerfil() {this.nombre = "MI PERFIL";}
  cambiarConfiguracion() {this.nombre = "CONFIGURACION";}
  cambiarAcerca() {this.nombre = "ACERCA DE";}


  //contenido de carrito

  private pathC = 'cantidadCompras/';
  contenidoS:CantidadCompras[] = [];

  getActividadC(){
    this.firestore.getCollection<CantidadCompras>(this.pathC).subscribe(res=> {
      this.contenidoS = res
    });
  }



}
