import { Injectable } from '@angular/core';
import { Item } from './task.model';
import { User } from '../user/users.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListaServiceService {
  private itens: Item[] = this.carregarDoLocalStorage();
  private users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

  private tarefasAtualizadas = new Subject<void>();
  tarefasAtualizadas$ = this.tarefasAtualizadas.asObservable();

  getAllUsers(): User[] {
    return this.users;
  }

  getItensByUser(userId: number): Item[] {
    return this.itens.filter((item) => item.userId === userId);
  }

  getItens(): Item[] {
    return this.itens;
  }

  adicionarItem(nome: string, categoria: string, userId: number): void {
    if (nome.trim()) {
      const novoItem: Item = {
        id:
          this.itens.length > 0 ? this.itens[this.itens.length - 1].id + 1 : 1,
        // FIXME: id: this.itens.length++, // TESTAR
        nome,
        categoria,
        userId,
      };
      this.itens.push(novoItem);
      this.salvarNoLocalStorage();
      this.notificarAtualizacao();
    }
  }

  removerItem(itemId: number, userId: number): void {
    // remoção: Normalmente é realizada por indices.
    this.itens = this.itens.filter(
      (item) => !(item.id === itemId && item.userId === userId)
    );
    this.salvarNoLocalStorage();
    this.notificarAtualizacao();
  }

  limparLista(userId: number): void {
    this.itens = this.itens.filter((item) => item.userId !== userId);
    this.salvarNoLocalStorage();
    this.notificarAtualizacao();
  }

  getTaskById(id: number): Item | undefined {
    return this.itens.find((task) => task.id === id);
  }

  updateTask(updatedTask: any): void {
    this.itens = this.itens.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );

    //FIXME: this.itens[Index] = updatedTask;
    this.salvarNoLocalStorage();
    this.notificarAtualizacao();
    console.log('Tarefas atualizadas no localStorage:', this.itens);
  }

  private salvarNoLocalStorage(): void {
    localStorage.setItem('listaDeCompras', JSON.stringify(this.itens));
  }

  private carregarDoLocalStorage(): Item[] {
    const dados = localStorage.getItem('listaDeCompras');
    return dados ? JSON.parse(dados) : [];
  }

  private notificarAtualizacao(): void {
    this.tarefasAtualizadas.next();
    console.log('Notificação de atualização emitida.');
  }
}
