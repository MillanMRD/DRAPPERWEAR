import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Producto } from '../producto';
import { ProductoService } from '../producto.service';
import { AuthService } from './../../shared/auth.service';
import { TokenService } from '../../shared/token.service';
import { AuthStateService } from '../../shared/auth-state.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent {

  id!: number;
  productos!: any;
  isSignedIn: boolean = false;

  public imgURL = `${environment.imgURL}/`;

  constructor(
    private route: ActivatedRoute,
    private productoService: ProductoService,
    private auth: AuthStateService,
    public token: TokenService,
    public authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getProductDetails();
    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
    });

  }

  getProductDetails(): void {
    this.id = this.route.snapshot.params['idPerson'];
    this.productoService.find(this.id).subscribe((data: any) => {
      this.productos = data;
    });
  }
}
