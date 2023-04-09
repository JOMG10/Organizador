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

  opcion = this.INICIO
  constructor() {}

}
