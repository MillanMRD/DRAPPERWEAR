import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';

import { ShoppingComponent } from './shopping/shopping.component';

const routes: Routes = [
  { path: 'producto', redirectTo: 'producto/index', pathMatch: 'full' },
  { path: 'producto/index', component: IndexComponent },
  { path: 'producto/show/:idPerson', component: ViewComponent },
  { path: 'producto/create', component: CreateComponent },
  { path: 'producto/edit/:idPerson', component: EditComponent },

  { 
  	path: 'producto/shopping/:id', 
  	component: ShoppingComponent 
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductoRoutingModule { }
