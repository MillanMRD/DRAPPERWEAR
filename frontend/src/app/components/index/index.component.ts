import { Component, OnInit } from '@angular/core';
import { TokenService } from '../../shared/token.service';
import { AuthStateService } from '../../shared/auth-state.service';
import { AuthService } from './../../shared/auth.service';// User interface
import { Router } from '@angular/router';

export class User {
  id: any;
  name: any;
  email: any;
  rol: any;
}

@Component({
  selector: 'app-index-user',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  isSignedIn: boolean = false;
  isAdmin: boolean = false;
  isEmployee: boolean = false;
  UserProfile!: User;
  mostrarTabla: boolean = false;

  users: User[] = [];

  constructor(private auth: AuthStateService,
    public router: Router,
    public token: TokenService,
    public authService: AuthService,) { }

  ngOnInit(): void {
    this.authService.getAllUsers().subscribe((data: any) => {
      this.users = data;
    });

    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
    });
  }

  deleteUser(id: number): void {
    this.authService.deleteUser(id).subscribe(() => {
      this.users = this.users.filter(user => user.id !== id);
    });

  }
  mostrarTablaUsuarios() {
    if (this.mostrarTabla == true) {
      this.mostrarTabla = false;
    } else {
      this.mostrarTabla = true;
    }
  }
}

