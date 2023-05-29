import { Component, OnInit } from '@angular/core';

import { PedidoService } from '../pedido.service';
import { Pedido } from '../pedido';

@Component({
  selector: 'app-index-pedido',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  pedidos: Pedido[] = [];
  mostrarTabla: boolean = false;


  constructor(public pedidoService: PedidoService) { }

  ngOnInit(): void {
    this.pedidoService.getAll().subscribe((data: Pedido[]) => {
      this.pedidos = data;
      console.log(this.pedidos);
    })
  }

  marcarPedidoEnCache(pedido: Pedido): void {
    pedido.enCache = true; // Actualiza la propiedad enCache del pedido a true
    // Aquí puedes realizar cualquier otra lógica que necesites al marcar el pedido en caché
  }

  mostrarTablaUsuarios() {
    if (this.mostrarTabla == true) {
      this.mostrarTabla = false;
    } else {
      this.mostrarTabla = true;
    }
  }
}
