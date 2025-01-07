import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { ListaService } from './task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';
import { Item } from './task.model';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from './dialog.component';

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
    private snackBar: MatSnackBar,
    private dialog: MatDialog
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
      this.listaService.getAll().subscribe({
        next: (data) => {
          this.tarefas = data.filter((item) => item.userId === this.userId);
        },
        error: (err) => {
          console.error('Erro ao carregar tarefas:', err);
          this.snackBar.open(
            'Não foi possível carregar as tarefas. Sem conexão com a API.',
            'Fechar',
            {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'right',
            }
          );
        },
      });
    }
  }

  openDialogPromise() {
    return new Promise((resolve) => {
      const dialogRef = this.dialog.open(DialogComponent);

      return dialogRef
        .afterClosed()
        .subscribe((result: boolean) => resolve(result));
    });
  }
  removerItem(index: number) {
    this.openDialogPromise().then((result) => {
      if (!result) {
        return;
      }

      const itemId = this.tarefas[index]?.id;
      if (itemId) {
        this.listaService.deleteItem(itemId).subscribe(() => {});
        this.tarefas.splice(index, 1);
        this.snackBar.open('Tarefa removida com sucesso!', 'Fechar', {
          duration: 3000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
        });
      }
    });
  }

  limparLista() {
    this.openDialogPromise().then((result) => {
      if (!result) {
        return;
      }

      this.listaService.clearLista(this.userId).subscribe(() => {});
      this.tarefas = [];
      this.snackBar.open('Todas as tarefas foram removidas!', 'Fechar', {
        duration: 3000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    });
  }
}
