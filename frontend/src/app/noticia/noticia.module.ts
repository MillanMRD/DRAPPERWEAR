import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NoticiaRoutingModule } from './noticia-routing.module';
import { IndexComponent } from './index/index.component';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    NoticiaRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class NoticiaModule { }
