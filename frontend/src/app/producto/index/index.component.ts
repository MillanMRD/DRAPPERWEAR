import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductoService } from '../producto.service';
import { Producto } from '../producto';
import { AuthService } from './../../shared/auth.service';

export class User {
  name: any;
  email: any;
  rol: any;
}
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  UserProfile!: User;
  isAdmin: boolean = false;
  isEmployee: boolean = false;
  productos: any[] = [];
  public imgURL = `${environment.imgURL}`;

  constructor(public productoService: ProductoService,
    public authService: AuthService
  ) {
    this.authService.profileUser().subscribe((data: any) => {
      this.UserProfile = data;
      console.log(this.UserProfile.rol);

      if (this.UserProfile.rol == 1) {
        this.isAdmin = true;
      } else if (this.UserProfile.rol == 2) {
        this.isEmployee = true;
      }

    });
  }

  ngOnInit(): void {

    this.productoService.getAll().subscribe((data: Producto[]) => {
      //this.productos = data;
      this.productos = data;
      console.log((this.productos));

    })
    this.constructor();
  }

  deleteProducto(id: any) {
    this.productoService.delete(id).subscribe(res => {
      this.productos = this.productos.filter(item => item.ID_Producto !== id);
      console.log('Person deleted successfully!');
    })
  }

}
