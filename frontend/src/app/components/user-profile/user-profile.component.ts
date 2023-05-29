import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../shared/token.service';
import { AuthStateService } from '../../shared/auth-state.service';
import { AuthService } from './../../shared/auth.service';// User interface
import { Router } from '@angular/router';

export class User {
  name: any;
  email: any;
  rol: any;
}
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {

  isSignedIn: boolean = false;
  isAdmin: boolean = false;
  isEmployee: boolean = false;
  UserProfile!: User;

  constructor(private auth: AuthStateService,
    public router: Router,
    public token: TokenService,
    public authService: AuthService,) {
    this.authService.profileUser().subscribe((data: any) => {
      this.UserProfile = data;
      console.log(this.UserProfile.rol);
    });
  }
  ngOnInit() {
    this.authService.profileUser().subscribe((data: any) => {
      this.UserProfile = data;
      console.log(this.UserProfile.rol);

      if (this.UserProfile.rol == 1) {
        this.isAdmin = true;
      } else if (this.UserProfile.rol == 2) {
        this.isEmployee = true;
      }

    });
    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
    });
  }
}