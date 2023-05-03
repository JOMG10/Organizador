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


  //contenido de las seleccione de niño, niña, dama y caballero

  categorias = [
    { id: 1, nombre: 'Hombres', imagen: 'assets/img/hombre.jpg' },
    { id: 2, nombre: 'Mujeres', imagen: 'assets/img/women.jpg' },
    { id: 3, nombre: 'Niños', imagen: 'assets/img/kids.jpg' },
    { id: 4, nombre: 'Deportes', imagen: 'assets/img/sports.jpg' }
  ];

  //contenido de los tenis para caballero
  modelos = [
    { id: 1, nombre: 'Tenis', link:"/caballero/tenis-c" },
    { id: 2, nombre: 'Zapatos', link: "/caballero/zapatos-c" },
    { id: 3, nombre: 'Sandalias y chanclas',link:"/caballero/sandalias-c"},
    { id: 4, nombre: 'Accesorios', link: "/accesorios"}
  ];

  segmentValue = 'option1'; // Valor por defecto del segmento

  verProductos() {
    this.router.navigateByUrl('/productos');
  }

  //comienza el contenido de los tenis para DAMA

  modelosD = [
    { id: 1, nombre: 'Tenis', link:"/dama/tenis-d" },
    { id: 2, nombre: 'Zapatos', link: "/dama/zapatos-d" },
    { id: 3, nombre: 'Sandalias y chanclas',link:"/dama/sandalias-d"},
    { id: 4, nombre: 'Accesorios', link: "/dama/accesorios-d"}
  ];

  //comienza el contenido de los tenis para NIÑO

  modelosB = [
    { id: 1, nombre: 'Tenis', link:"/boys/tenis-b" },
    { id: 2, nombre: 'Zapatos', link: "/boys/zapatos-b" },
    { id: 3, nombre: 'Sandalias y chanclas',link:"/boys/sandalias-b"},
    { id: 4, nombre: 'Accesorios', link: "/boys/accesorios-b"}
  ];


  //comienza el contenido de los tenis para NIÑA

  modelosG = [
    { id: 1, nombre: 'Tenis', link:"/bgirls/tenis-g" },
    { id: 2, nombre: 'Zapatos', link: "/bgirls/zapatos-g" },
    { id: 3, nombre: 'Sandalias y chanclas',link:"/bgirls/sandalias-g"},
    { id: 4, nombre: 'Accesorios', link: "/bgirls/accesorios-g"}
  ];

}
