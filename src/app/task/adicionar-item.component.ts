import { Component } from '@angular/core';
import { ListaServiceService } from './task.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-adicionar-item',
  templateUrl: './adicionar-item.component.html',
  styleUrls: ['./adicionar-item.component.css'],
})
export class AdicionarItemComponent {
  // FIXME: 11
  erroMensagem = '';
  categorias = ['Alimentos', 'Tarefas', 'Compras', 'Outros'];

  constructor(
    private listaService: ListaServiceService,
    private snackBar: MatSnackBar
  ) {}

  adicionar(novoItem: string, categoria: string) {
    const loggedInUser = JSON.parse(
      localStorage.getItem('loggedInUser') || '{}'
    );

    if (!novoItem.trim()) {
      this.erroMensagem = 'O item não pode ser vazio.';
      return;
    }

    const userId = loggedInUser.id;

    if (
      this.listaService
        .getItensByUser(userId)
        .some((item) => item.nome === novoItem)
    ) {
      this.erroMensagem = 'O item já existe na lista.';
      return;
    }

    this.listaService.adicionarItem(novoItem, categoria, userId);
    this.erroMensagem = '';
    this.snackBar.open('Item adicionado com sucesso!', 'Fechar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
