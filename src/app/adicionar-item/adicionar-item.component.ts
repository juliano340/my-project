import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListaServiceService } from '../lista-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-adicionar-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './adicionar-item.component.html',
  styleUrls: ['./adicionar-item.component.css']
})
export class AdicionarItemComponent {
  erroMensagem = ''; // Mensagem de erro para exibir no HTML

  categorias = ['Alimentos', 'Tarefas', 'Compras', 'Outros']; // Categorias pré-definidas

  constructor(private listaService: ListaServiceService, private snackBar: MatSnackBar) {}

  adicionar(novoItem: string, categoria: string): void {
    if (!novoItem.trim()) {
      this.erroMensagem = 'O item não pode ser vazio.';
      return;
    }

    if (this.listaService.getItens().some(item => item.nome === novoItem)) {
      this.erroMensagem = 'O item já existe na lista.';
      return;
    }

    this.listaService.adicionarItem(novoItem, categoria);
    this.erroMensagem = ''; // Limpa a mensagem de erro
    this.snackBar.open('Item adicionado com sucesso!', 'Fechar', { duration: 3000 });
  }
}
