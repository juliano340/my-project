import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; 
import { ListaServiceService } from '../lista-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-exibir-lista',
  standalone: true,
  imports: [CommonModule, MatListModule, MatButtonModule, MatIconModule],
  templateUrl: './exibir-lista.component.html',
  styleUrls: ['./exibir-lista.component.css']
})
export class ExibirListaComponent {
  constructor(private listaService: ListaServiceService, private snackBar: MatSnackBar) { }

  get itens() {
    return this.listaService.getItens();
  }

  get totalItens() {
    return this.listaService.getItens().length;
  }

  limparLista() {
    this.listaService.limparLista(); // Limpa o array
    this.snackBar.open('Limpeza realizada com sucesso!', 'Fechar', { duration: 3000 });
  }

  removerItem(index: number) {
    const itemRemovido = this.listaService.getItens()[index]; // Salva o item antes de remover
    this.listaService.removerItem(index);
    const snackBarRef = this.snackBar.open('Item removido com sucesso!', 'Desfazer', { duration: 3000 });

    snackBarRef.onAction().subscribe(() => {
      this.listaService.adicionarItem(itemRemovido.nome, itemRemovido.categoria); // Restaura o item
      this.snackBar.open('Item restaurado!', 'Fechar', { duration: 3000 });
    });
  }
}
