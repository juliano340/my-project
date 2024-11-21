import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, Routes } from '@angular/router';

import { AppComponent } from './app/app.component';
import { AdicionarItemComponent } from './app/adicionar-item/adicionar-item.component';
import { ExibirListaComponent } from './app/exibir-lista/exibir-lista.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

// Configuração das rotas
const routes: Routes = [
  { path: 'adicionar', component: AdicionarItemComponent },
  { path: 'exibir', component: ExibirListaComponent },
  { path: '', redirectTo: 'adicionar', pathMatch: 'full' }
];

// Inicializamos a aplicação com o AppComponent e configuramos o roteamento
bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes), provideAnimationsAsync()]
});
