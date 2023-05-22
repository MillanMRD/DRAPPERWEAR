import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.scss'],
})
export class ProductosComponent implements OnInit {
  /* productos = [
    [
      'Nombre del producto 1',
      'Descripción del producto 1',
      'Precio del producto 1',
      'URL de la imagen del producto 1',
    ],
    [
      'Nombre del producto 2',
      'Descripción del producto 2',
      'Precio del producto 2',
      'URL de la imagen del producto 2',
    ],
    [
      'Nombre del producto 3',
      'Descripción del producto 3',
      'Precio del producto 3',
      '/frontend/src/assets/images/drapper_drop1_1.webp',
    ],
    [
      'Nombre del producto 3',
      'Descripción del producto 3',
      'Precio del producto 3',
      '/frontend/src/assets/images/drapper_drop1_1.webp',
    ],
    [
      'Nombre del producto 3',
      'Descripción del producto 3',
      'Precio del producto 3',
      '/frontend/src/assets/images/drapper_drop1_1.webp',
    ],
    [
      'Nombre del producto 3',
      'Descripción del producto 3',
      'Precio del producto 3',
      '/frontend/src/assets/images/drapper_drop1_1.webp',
    ],
    // y así sucesivamente...
  ];
*/

  productos: any;

  constructor() {
    this.productos = [
      {
        id: 1,
        nombre: 'Bold Pink Hoodie',
        desc: 'Para hacer travesias',
        imagen: '/assets/images/fotobasicaDARPPER.jpg',
        precio: 164,
      },

      {
        id: 2,
        nombre: 'Bold Pink Hoodie',
        desc: 'Los esquís de freeride tienen un patín más ancho de lo normal',
        imagen: '/assets/images/fotobasicaDARPPER.jpg',
        precio: 220,
      },
      {
        id: 3,
        nombre: 'Bold Pink Hoodie',
        desc: 'Son los que utilizarás en las estaciones de esquí',
        imagen: '/assets/images/fotobasicaDARPPER.jpg',
        precio: 421,
      },
      {
        id: 3,
        nombre: 'Bold Pink Hoodie',
        desc: 'Son los que utilizarás en las estaciones de esquí',
        imagen: '/assets/images/fotobasicaDARPPER.jpg',
        precio: 421,
      }, {
        id: 3,
        nombre: 'Bold Pink Hoodie',
        desc: 'Son los que utilizarás en las estaciones de esquí',
        imagen: '/assets/images/fotobasicaDARPPER.jpg',
        precio: 421,
      }, {
        id: 3,
        nombre: 'Bold Pink Hoodie',
        desc: 'Son los que utilizarás en las estaciones de esquí',
        imagen: '/assets/images/fotobasicaDARPPER.jpg',
        precio: 421,
      },
    ];
  }

  ngOnInit(): void { }
}
