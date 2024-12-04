import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdicionarItemComponent } from './task/adicionar-item/adicionar-item.component';
import { ExibirListaComponent } from './task/exibir-lista/exibir-lista.component';
import { UserRegisterComponent } from './user/user-register/user-register.component';
import { UserLoginComponent } from './user/user-login/user-login.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: UserLoginComponent, canActivate: [authGuard] },
  { path: 'adicionar', component: AdicionarItemComponent },
  { path: 'exibir', component: ExibirListaComponent },
  { path: '', redirectTo: 'adicionar', pathMatch: 'full' },
  {
    path: 'register',
    component: UserRegisterComponent,
    canActivate: [authGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
