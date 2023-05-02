import {Component, Input, OnInit} from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {FirestoreService} from "../services/firestore.service";
import {getBoolean} from "@angular/fire/remote-config";

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage implements OnInit{

  constructor(
    ) {
  }

  ngOnInit() {
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
  cambiarPendiente() {this.nombre = "PENDIENTES";}
  cambiarHorario() {this.nombre = "HORARIO";}
  cambiarPerfil() {this.nombre = "MI PERFIL";}
  cambiarConfiguracion() {this.nombre = "CONFIGURACION";}
  cambiarAcerca() {this.nombre = "ACERCA DE";}


}
