import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdicionarItemComponent } from './task/adicionar-item.component';
import { ExibirListaComponent } from './task/exibir-lista.component';
import { UserRegisterComponent } from './user/user-register.component';
import { UserLoginComponent } from './user/user-login.component';
import { authGuard } from './auth.guard';
import { authProtectGuard } from './auth-protect.guard';
import { AdminUserListComponent } from './task/admin-user-list.component';
import { AdminUserTasksComponent } from './task/admin-user-tasks.component';
import { TaskEditComponent } from './task/task-edit.component';

const routes: Routes = [
  { path: 'login', component: UserLoginComponent, canActivate: [authGuard] },
  {
    path: 'adicionar',
    component: AdicionarItemComponent,
    canActivate: [authProtectGuard],
  },
  {
    path: 'exibir',
    component: ExibirListaComponent,
    canActivate: [authProtectGuard],
  },
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'register',
    component: UserRegisterComponent,
    canActivate: [authGuard],
  },

  {
    path: 'admin/users',
    component: AdminUserListComponent,
    canActivate: [authProtectGuard],
    data: { requiresAdmin: true },
  },
  {
    path: 'admin/tasks/:id',
    component: AdminUserTasksComponent,
    canActivate: [authProtectGuard],
    data: { requiresAdmin: true },
  },

  { path: 'task/edit/:id', component: TaskEditComponent },

  { path: '**', redirectTo: 'login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
