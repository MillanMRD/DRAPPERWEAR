import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {

  id!: number;
  productos!: any;
  public imgURL = `${environment.imgURL}/`;
  
  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService
  ) { }

  ngOnInit(): void {
    this.getProductDetails();
  }

  getProductDetails(): void {
    this.id = this.route.snapshot.params['idPerson'];
    this.productoService.find(this.id).subscribe((data: any) => {
      this.productos = data;
    });
  }
}
