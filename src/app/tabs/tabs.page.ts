import { Component } from '@angular/core';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss']
})
export class TabsPage {

  INICIO = "INICIO";
  OPCION1 = "OPCION_1"
  OPCION2 = "OPCION_2"
  OPCION3 = "OPCION_3"
  OPCION4 = "OPCION_4"
  OPCION5 = "OPCION_5"
  OPCION6 = "OPCION_6"

  opcion = this.INICIO
  constructor() {}
  nombre="INICIO";
  cambiarInicio() {this.nombre = "INICIO";}
  cambiarCalendario() {this.nombre = "CALENDARIO";}
  cambiarAgenda() {this.nombre = "AGENDA";}
  cambiarHorario() {this.nombre = "HORARIO";}
  cambiarPerfil() {this.nombre = "MI PERFIL";}
  cambiarConfiguracion() {this.nombre = "CONFIGURACION";}
  cambiarAcerca() {this.nombre = "ACERCA DE";}
}
