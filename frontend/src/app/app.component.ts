import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TokenService } from './shared/token.service';
import { AuthStateService } from './shared/auth-state.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  isSignedIn!: boolean;
  rutaActual: string = "";

  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService,

  ) { }

  ngOnInit() {
    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.rutaActual = this.router.url;
      }
    });

  }
  // Signout
  signOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['api/producto/index']);
    this.isSignedIn = false;
    location.reload();

  }
  obtenerRutaActual() {

  }
}