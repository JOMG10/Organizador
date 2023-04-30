import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController} from "@ionic/angular";

@Component({
  selector: 'app-contenido',
  templateUrl: './contenido.page.html',
  styleUrls: ['./contenido.page.scss'],
})
export class ContenidoPage implements OnInit {

  constructor(private alertController: AlertController, private modalController:ModalController) {
  }

  ngOnInit() {
  }


  tenis = [
    {  precio:"1800",descripcion:"tenis nike",imagen:"assets/img/tenis/tenis5.png"},
    { precio:"1800",descripcion:"tenis nike",imagen:"assets/img/tenis/tenis5.png"},
    {precio:"1800",descripcion:"tenis nike",imagen:"assets/img/tenis/tenis5.png"},
    {precio:"1800",descripcion:"tenis nike",imagen:"assets/img/tenis/tenis5.png"}
  ];

  descripcionTenis(){
  }
  isModalOpen = false;

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  tallas=[
    {talla:"25"},
    {talla:"26"},
    {talla:"27"},
    {talla:"28"},
    {talla:"29"},
    {talla:"30"},
    {talla:"21"},
  ]

  isModalClose =false;
  tallaSelecionada() {
    this.modalController.dismiss();
  }


  tallaSelecion="seleccionar talla"
  seleccionarTalla(){
    this.tallaSelecion = "25"
  }

  valor = 1

  async presentAlert() {
    this.valor=2

    const alert = await this.alertController.create({
      header: 'Carrito',
      subHeader: 'Se ha agregado un producto al carrito',
      message: '1 producto seleccionado',
      buttons: ['De acuerdo'],
    });

    await alert.present();
  }

}
