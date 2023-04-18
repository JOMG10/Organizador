import { Component } from '@angular/core';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  name: any;
  constructor() {}

  onWillDismiss($event: any) {
  }
  cancel() {
  }

  confirm() {
  }

  INICIO = "INICIO";
  OPCION1 = "OPCION_1"

  opcion = this.INICIO

}
