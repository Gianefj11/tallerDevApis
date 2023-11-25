// Angular Imports
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Guards
import { authActivateGuard } from './guards/auth-activate.guard';
import { authMatchGuard } from './guards/auth-match.guard';

const routes: Routes = [
  {
    path: "auth",
    loadChildren: () => import("./modules/auth/auth.module").then(m => m.AuthModule),
    canActivate: [authActivateGuard],
    canMatch: [authMatchGuard]
  },
  {
    path: "devs",
    loadChildren: () => import("./modules/devs/devs.module").then(m => m.DevsModule),
    canActivate: [authActivateGuard],
    canMatch: [authMatchGuard]
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
