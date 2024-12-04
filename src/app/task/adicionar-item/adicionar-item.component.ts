import { Component } from '@angular/core';
import { ListaServiceService } from '../lista-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-adicionar-item',
  templateUrl: './adicionar-item.component.html',
  styleUrls: ['./adicionar-item.component.css'],
})
export class AdicionarItemComponent {
  erroMensagem = '';

  categorias = ['Alimentos', 'Tarefas', 'Compras', 'Outros'];

  constructor(
    private listaService: ListaServiceService,
    private snackBar: MatSnackBar
  ) {}

  adicionar(novoItem: string, categoria: string): void {
    if (!novoItem.trim()) {
      this.erroMensagem = 'O item não pode ser vazio.';
      return;
    }
    if (this.listaService.getItens().some((item) => item.nome === novoItem)) {
      this.erroMensagem = 'O item já existe na lista.';
      return;
    }
    this.listaService.adicionarItem(novoItem, categoria);
    this.erroMensagem = '';
    this.snackBar.open('Item adicionado com sucesso!', 'Fechar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
  }
}
