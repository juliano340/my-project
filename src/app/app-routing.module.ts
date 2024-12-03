import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdicionarItemComponent } from './adicionar-item/adicionar-item.component';
import { ExibirListaComponent } from './exibir-lista/exibir-lista.component';

const routes: Routes = [
  { path: 'adicionar', component: AdicionarItemComponent },
  { path: 'exibir', component: ExibirListaComponent },
  { path: '', redirectTo: 'adicionar', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
