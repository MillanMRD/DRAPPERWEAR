import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxPayPalModule } from 'ngx-paypal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ColeccionesComponent } from './colecciones/colecciones.component';
import { ProductosComponent } from './productos/productos.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { IndexComponent as UserIndex } from './components/index/index.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthInterceptor } from './shared/auth-interceptor.service';
import { NoticiasComponent } from './noticias/noticias.component';
import { ProductoModule } from './producto/producto.module';
import { NavUserComponent } from './components/nav-user/nav-user.component';
import { NoticiaModule } from './noticia/noticia.module';
import { IndexComponent } from './noticia/index/index.component';
import { IndexComponent as ProductoIndexComponent } from './producto/index/index.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CreateComponent } from './noticia/create/create.component';
import { EditComponent } from './noticia/edit/edit.component';
import { ViewComponent } from './noticia/view/view.component';
import { LandingComponent } from './landing/landing.component';
import { IndexComponent as PedidoIndex } from './pedido/index/index.component';



@NgModule({
  declarations: [
    AppComponent,
    ColeccionesComponent,
    ProductosComponent,
    SigninComponent,
    SignupComponent,
    UserProfileComponent,
    NoticiasComponent,
    NavUserComponent,
    IndexComponent,
    ProductoIndexComponent,
    CreateComponent,
    EditComponent,
    ViewComponent,
    LandingComponent,
    PedidoIndex,
    UserIndex

  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    ProductoModule,
    NgxPayPalModule,
    NoticiaModule,
    NgbModule

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
