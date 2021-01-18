import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { MatButtonModule, MatButtonToggleModule, MatToolbarModule } from '@angular/material';
import { CadastroModule } from './cadastro/cadastro.module';
import { EdicaoModule } from './edicao/edicao.module';
import { HomeModule } from './home/home.module';
import { HttpClientModule } from '@angular/common/http';
import { ErrorDialogModule } from './dialog/error-dialog.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonToggleModule,
    MatButtonModule,
    CadastroModule,
    EdicaoModule,
    HomeModule,
    ErrorDialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
