import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-tab02',
  templateUrl: './tab02.page.html',
  styleUrls: ['./tab02.page.scss'],
})
export class Tab02Page implements OnInit {

  constructor(private router: Router) {}
  ngOnInit() {
  }

  categorias = [
    { id: 1, nombre: 'Hombres', imagen: 'assets/img/hombre.jpg' },
    { id: 2, nombre: 'Mujeres', imagen: 'assets/img/women.jpg' },
    { id: 3, nombre: 'Niños', imagen: 'assets/img/kids.jpg' },
    { id: 4, nombre: 'Deportes', imagen: 'assets/img/sports.jpg' }
  ];

  modelos = [
    { id: 1, nombre: 'Tenis', link:"/atenis" },
    { id: 2, nombre: 'Zapatos', link: "/azapatos" },
    { id: 3, nombre: 'Sandalias y chanclas',link:"/asandalias"},
    { id: 4, nombre: 'Accesorios', link: "/accesorios"}
  ];

  segmentValue = 'option1'; // Valor por defecto del segmento





  verProductos() {
    this.router.navigateByUrl('/productos');
  }

}
