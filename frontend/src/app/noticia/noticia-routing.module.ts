import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { ViewComponent } from './view/view.component';

const routes: Routes = [
  { path: 'noticia', redirectTo: 'noticia/index', pathMatch: 'full' },
  { path: 'noticia/index', component: IndexComponent },
  { path: 'noticia/show/:idPerson', component: ViewComponent },
  { path: 'noticia/create', component: CreateComponent },
  { path: 'noticia/edit/:idPerson', component: EditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NoticiaRoutingModule { }
