import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from '../shared/token.service';
import { AuthStateService } from '../shared/auth-state.service';
import { AuthService } from './../shared/auth.service';

export class User {
  name: any;
  email: any;
  rol: any;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  UserProfile!: User;
  isSignedIn: boolean = false;
  isAdmin: boolean = false;
  isEmployee: boolean = false;


  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService,
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
  ngOnInit() {
    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
    });
    this.constructor();
  }
  // Signout
  signOut() {
    this.auth.setAuthState(false);
    this.token.removeToken();
    this.router.navigate(['producto/index']);
    location.reload();
  }


}
