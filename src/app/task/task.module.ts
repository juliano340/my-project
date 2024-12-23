import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdicionarItemComponent } from './adicionar-item.component';
import { ExibirListaComponent } from './exibir-lista.component';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { TaskMenuComponent } from './task-menu.component';
import { RouterLink } from '@angular/router';
import { RouterModule } from '@angular/router';
import { AdminUserListComponent } from './admin-user-list.component';
import { AdminUserTasksComponent } from './admin-user-tasks.component';
import { MatTableModule } from '@angular/material/table';
import { TaskEditComponent } from './task-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogComponent } from './dialog.component';

@NgModule({
  declarations: [
    AdicionarItemComponent,
    ExibirListaComponent,
    TaskMenuComponent,
    AdminUserListComponent,
    AdminUserTasksComponent,
    TaskEditComponent,
    DialogComponent,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatListModule,
    MatButtonModule,
    RouterLink,
    RouterModule,
    MatTableModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  exports: [
    AdicionarItemComponent,
    ExibirListaComponent,
    TaskMenuComponent,
    DialogComponent,
  ],
})
export class TaskModule {}
