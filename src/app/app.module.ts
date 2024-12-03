import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Importante para Material
import { MatSnackBarModule } from '@angular/material/snack-bar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdicionarItemComponent } from './adicionar-item/adicionar-item.component';

@NgModule({
  declarations: [
    AppComponent,
    AdicionarItemComponent 
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, 
    MatSnackBarModule,
    AppRoutingModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
