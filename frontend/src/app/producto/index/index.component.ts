import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProductoService } from '../producto.service';
import { Producto } from '../producto';
import { AuthService } from './../../shared/auth.service';
import { TokenService } from '../../shared/token.service';
import { AuthStateService } from '../../shared/auth-state.service';
import { Router } from '@angular/router';


export class User {
  name: any;
  email: any;
  rol: any;
}
@Component({
  selector: 'app-index-producto',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  isSignedIn: boolean = false;
  UserProfile!: User;
  isAdmin: boolean = false;
  isEmployee: boolean = false;
  rutaActual: string = "";
  productos: any[] = [];
  public imgURL = `${environment.imgURL}`;

  constructor(public productoService: ProductoService,
    private auth: AuthStateService,
    public token: TokenService,
    public authService: AuthService,
    private router: Router
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

    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
    });
    this.obtenerRutaActual();
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

  obtenerRutaActual() {
    this.rutaActual = this.router.url;
  }

}
