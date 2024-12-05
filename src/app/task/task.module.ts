import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdicionarItemComponent } from './adicionar-item/adicionar-item.component';
import { ExibirListaComponent } from './exibir-lista/exibir-lista.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { TaskMenuComponent } from './task-menu/task-menu.component';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AdminUserListComponent } from './admin-user-list/admin-user-list.component';
import { AdminUserTasksComponent } from './admin-user-tasks/admin-user-tasks.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AdicionarItemComponent,
    ExibirListaComponent,
    TaskMenuComponent,
    AdminUserListComponent,
    AdminUserTasksComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    RouterLink,
    RouterModule,
    MatTableModule,
  ],
  exports: [AdicionarItemComponent, ExibirListaComponent, TaskMenuComponent],
})
export class TaskModule {}
