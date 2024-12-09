import { Component, OnInit } from '@angular/core';
import { ListaServiceService } from './lista-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from './task.model';

@Component({
  selector: 'app-exibir-lista',
  templateUrl: './exibir-lista.component.html',
  styleUrls: ['./exibir-lista.component.css'],
})
export class ExibirListaComponent implements OnInit {
  itens: Item[] = [];
  totalItens: number = 0;
  isAdmin: boolean = false;

  constructor(
    private listaService: ListaServiceService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const loggedInUser = JSON.parse(
      localStorage.getItem('loggedInUser') || '{}'
    );

    if (loggedInUser?.id) {
      this.itens = this.listaService.getItensByUser(loggedInUser.id);
      this.totalItens = this.itens.length;
      this.isAdmin = loggedInUser.role === 'admin';
    }
  }

  removerItem(index: number): void {
    const loggedInUser = JSON.parse(
      localStorage.getItem('loggedInUser') || '{}'
    );

    const confirmacao = window.confirm(
      'Você tem certeza de que deseja excluir a tarefa?'
    );

    if (!confirmacao) {
      return;
    }

    if (loggedInUser?.id) {
      const itemId = this.itens[index]?.id;
      this.listaService.removerItem(itemId, loggedInUser.id);
      this.itens.splice(index, 1);
      this.totalItens = this.itens.length;

      this.snackBar.open('Item removido com sucesso!', 'Fechar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    }
  }

  limparLista(): void {
    if (!this.isAdmin) {
      this.snackBar.open(
        'Apenas administradores podem limpar a lista.',
        'Fechar',
        {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        }
      );
      return;
    }

    const confirmacao = window.confirm(
      'Você tem certeza de que deseja limpar a lista?'
    );

    if (confirmacao) {
      const loggedInUser = JSON.parse(
        localStorage.getItem('loggedInUser') || '{}'
      );
      if (loggedInUser?.id) {
        this.listaService.limparLista(loggedInUser.id);
        this.itens = [];
        this.totalItens = 0;

        this.snackBar.open('Lista limpa com sucesso!', 'Fechar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      }
    }
  }
}
