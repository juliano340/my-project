import { UserService } from './../user/user.service';
import { Component, OnInit } from '@angular/core';
import { ListaService } from './task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Item } from './task.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';

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
    private listaService: ListaService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private UserService: UserService
  ) {}

  ngOnInit() {
    const loggedInUser = JSON.parse(
      localStorage.getItem('loggedInUser') || '{}'
    );

    if (loggedInUser?.id) {
      this.itens = this.listaService.getItensPorUsuario(loggedInUser.id);
      this.totalItens = this.itens.length;
      this.isAdmin = loggedInUser.role === 'admin';
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogComponent, {
      enterAnimationDuration: 0,
      exitAnimationDuration: 0,
    });

    return dialogRef.afterClosed();
  }
  // observable: observa eventos e retorna
  // subscribe: capta esses eventos
  // promise: Promessa de retorno de algo no futuro

  openDialogPromise() {
    return new Promise((resolve) => {
      const dialogRef = this.dialog.open(DialogComponent);

      return dialogRef
        .afterClosed()
        .subscribe((result: boolean) => resolve(result));
    });
  }

  removerItem(index: number) {
    const loggedInUser = this.UserService.getLoggedInUser();

    this.openDialogPromise().then((result) => {
      if (!result) {
        return;
      }

      if (loggedInUser?.id) {
        const itemId = this.itens[index]?.id;
        this.listaService.deleteItem(itemId);
        this.itens.splice(index, 1);
        this.totalItens = this.itens.length;

        this.snackBar.open('Item removido com sucesso!', 'Fechar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      }
    });

    // this.openDialog().subscribe((resposta: boolean) => {
    //   if (!resposta) {
    //     return;
    //   }

    //   if (loggedInUser?.id) {
    //     const itemId = this.itens[index]?.id;
    //     this.listaService.deleteItem(itemId);
    //     this.itens.splice(index, 1);
    //     this.totalItens = this.itens.length;

    //     this.snackBar.open('Item removido com sucesso!', 'Fechar', {
    //       duration: 3000,
    //       verticalPosition: 'top',
    //       horizontalPosition: 'right',
    //     });
    //   }
    // });
  }

  limparLista() {
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
        this.listaService.clearLista(loggedInUser.id);
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
