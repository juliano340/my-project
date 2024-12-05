import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ListaServiceService } from '../lista-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-admin-user-tasks',
  templateUrl: './admin-user-tasks.component.html',
  styleUrls: ['./admin-user-tasks.component.css'],
})
export class AdminUserTasksComponent implements OnInit {
  tarefas: any[] = [];
  userName: string = '';
  userId: number = 0;

  constructor(
    private route: ActivatedRoute,
    private listaService: ListaServiceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.userId = Number(this.route.snapshot.paramMap.get('id')); // Obtém o ID do usuário da URL
    const users = this.listaService.getAllUsers();
    const user = users.find((u) => u.id === this.userId);

    if (user) {
      this.userName = user.name;
      this.tarefas = this.listaService.getItensByUser(this.userId);
    }
  }

  removerItem(index: number): void {
    const itemId = this.tarefas[index]?.id;

    if (itemId) {
      this.listaService.removerItem(itemId, this.userId);
      this.tarefas.splice(index, 1);
      this.snackBar.open('Tarefa removida com sucesso!', 'Fechar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    }
  }

  limparLista(): void {
    const confirmacao = window.confirm(
      'Você tem certeza de que deseja limpar a lista?'
    );

    if (confirmacao) {
      this.listaService.limparLista(this.userId);
      this.tarefas = [];
      this.snackBar.open('Todas as tarefas foram removidas!', 'Fechar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    }
  }
}
