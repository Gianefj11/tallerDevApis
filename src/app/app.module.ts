import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FilterPipe } from './pipes/filter.pipe';
import { SharedModule } from "./modules/shared/shared.module";
import { AuthInterceptor } from './interceptor/auth.interceptor';

@NgModule({
    declarations: [
        AppComponent,
        FilterPipe
    ],
    providers: [ { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ReactiveFormsModule,
        HttpClientModule,
        SharedModule
    ]
})
export class AppModule { }
