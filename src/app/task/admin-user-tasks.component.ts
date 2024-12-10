import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ListaService } from './task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Item } from './task.model';

@Component({
  selector: 'app-admin-user-tasks',
  templateUrl: './admin-user-tasks.component.html',
  styleUrls: ['./admin-user-tasks.component.css'],
})
export class AdminUserTasksComponent implements OnInit {
  tarefas: Item[] = [];
  userName: string = '';
  userId: number = 0;
  routerSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private listaService: ListaService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    this.carregarDados();
  }

  carregarDados() {
    const users = this.listaService.getUsuarios();
    const user = users.find((u) => u.id === this.userId);

    if (user) {
      this.userName = user.name;
      this.tarefas = this.listaService.getItensPorUsuario(this.userId);
    }
  }
  removerItem(index: number) {
    const confirmacao = window.confirm(
      'Você tem certeza de que deseja excluir a tarefa?'
    );

    if (!confirmacao) {
      return;
    }
    const itemId = this.tarefas[index]?.id;
    if (itemId) {
      this.listaService.deleteItem(itemId);
      this.tarefas.splice(index, 1);
      this.snackBar.open('Tarefa removida com sucesso!', 'Fechar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    }
  }

  limparLista() {
    const confirmacao = window.confirm(
      'Você tem certeza de que deseja limpar a lista?'
    );

    if (!confirmacao) {
      return;
    }
    this.listaService.clearLista(this.userId);
    this.tarefas = [];
    this.snackBar.open('Todas as tarefas foram removidas!', 'Fechar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
