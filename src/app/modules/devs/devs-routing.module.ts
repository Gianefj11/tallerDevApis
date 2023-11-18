import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DevListComponent } from './pages/dev-list/dev-list.component';

const routes: Routes = [
  {
    path:'home',
    component:DevListComponent
  },
  {
    path:'**',
    redirectTo:'home'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DevsRoutingModule { }
