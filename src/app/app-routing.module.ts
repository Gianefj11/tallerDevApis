import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuardGuard } from './guards/auth-guard.guard';

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule)
  },
  {
    path: "devs",
    loadChildren: () => import("./modules/devs/devs.module").then(m => m.DevsModule),
    canActivate: [authGuardGuard]
  },
  {
    path: "",
    redirectTo: "auth",
    pathMatch: "full"
  },
  {
    path:"**",
    redirectTo:"auth"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
