import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdicionarItemComponent } from './task/adicionar-item/adicionar-item.component';
import { ExibirListaComponent } from './task/exibir-lista/exibir-lista.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';

const routes: Routes = [
  { path: 'adicionar', component: AdicionarItemComponent },
  { path: 'exibir', component: ExibirListaComponent },
  { path: '', redirectTo: 'adicionar', pathMatch: 'full' },
  { path: 'register', component: UserRegisterComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
