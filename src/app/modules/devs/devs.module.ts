import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DevsRoutingModule } from './devs-routing.module';
import { DevListComponent } from './pages/dev-list/dev-list.component';


@NgModule({
  declarations: [
    DevListComponent
  ],
  imports: [
    CommonModule,
    DevsRoutingModule,
    ReactiveFormsModule
  ]
})
export class DevsModule { }
