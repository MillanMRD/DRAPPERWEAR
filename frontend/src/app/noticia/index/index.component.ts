import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { NoticiaService } from '../noticia.service';
import { Noticia } from '../noticia';
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
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss'],
})
export class IndexComponent implements OnInit {

  showNavigationArrows = false;
  showNavigationIndicators = false;
  rutaActual: string = "";
  isSignedIn: boolean = false;
  idAl: number = 0;
  idsNoticias: number[] = [];
  UserProfile!: User;
  isAdmin: boolean = false;
  isEmployee: boolean = false;
  noticias: any[] = [];
  public imgURL = `${environment.imgURL}`;

  constructor(public noticiaService: NoticiaService,
    private auth: AuthStateService,
    public token: TokenService,
    public authService: AuthService,
    private router: Router) {

  }

  ngOnInit(): void {


    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
    });

    this.obtenerRutaActual();
    this.authService.profileUser().subscribe((data: any) => {
      this.UserProfile = data;
      console.log(this.UserProfile.rol);

      if (this.UserProfile.rol == 1) {
        this.isAdmin = true;
      } else if (this.UserProfile.rol == 2) {
        this.isEmployee = true;
      } else {
        this.isEmployee = false;
        this.isAdmin = false;
      }

    });

    this.noticiaService.getAll().subscribe((data: Noticia[]) => {
      //this.productos = data;
      this.noticias = data;
      for (const noticia of this.noticias) {
        this.idsNoticias.push(noticia.id)
      }
      const indiceAleatorio = Math.floor(Math.random() * this.idsNoticias.length);
      this.idAl = this.idsNoticias[indiceAleatorio];
      console.log(this.idAl);



    })

    this.constructor();
  }
  deleteProducto(id: any) {
    this.noticiaService.delete(id).subscribe(res => {
      this.noticias = this.noticias.filter(item => item.id !== id);
      console.log('Person deleted successfully!');
    })
  }
  obtenerRutaActual() {
    this.rutaActual = this.router.url;
  }
}
