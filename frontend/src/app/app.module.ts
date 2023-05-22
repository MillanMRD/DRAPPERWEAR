import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPayPalModule } from 'ngx-paypal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColeccionesComponent } from './colecciones/colecciones.component';
import { ProductosComponent } from './productos/productos.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthInterceptor } from './shared/auth-interceptor.service';
import { NoticiasComponent } from './noticias/noticias.component';
import { ProductoModule } from './producto/producto.module';
import { NavUserComponent } from './components/nav-user/nav-user.component';


@NgModule({
  declarations: [
    AppComponent,
    ColeccionesComponent,
    ProductosComponent,
    SigninComponent,
    SignupComponent,
    UserProfileComponent,
    NoticiasComponent,
    NavUserComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ProductoModule,
    NgxPayPalModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
