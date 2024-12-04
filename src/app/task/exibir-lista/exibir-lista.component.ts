import { Component, OnInit } from '@angular/core';
import { ListaServiceService } from '../lista-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-exibir-lista',
  templateUrl: './exibir-lista.component.html',
  styleUrls: ['./exibir-lista.component.css'],
})
export class ExibirListaComponent implements OnInit {
  itens: any[] = []; // Armazena os itens do usuário logado
  totalItens: number = 0; // Total de itens

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
    }
  }

  removerItem(index: number): void {
    const loggedInUser = JSON.parse(
      localStorage.getItem('loggedInUser') || '{}'
    );
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
