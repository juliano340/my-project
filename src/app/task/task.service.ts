import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import { Item } from './task.model';
import { User } from '../user/users.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListaService {
  constructor(private userService: UserService) {}

  private itens: Item[] = this.carregarDoLocalStorage();
  private users: User[] = this.userService.getUsers();

  getAllUsers() {
    return this.users;
  }

  getItensByUser(userId: number) {
    return this.itens.filter((item) => item.userId === userId);
  }

  getItens() {
    return this.itens;
  }

  adicionarItem(nome: string, categoria: string, userId: number) {
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

  removerItem(itemId: number, userId: number) {
    // remoção: Normalmente é realizada por indices.
    this.itens = this.itens.filter(
      (item) => !(item.id === itemId && item.userId === userId)
    );
    this.salvarNoLocalStorage();
    this.notificarAtualizacao();
  }

  limparLista(userId: number) {
    this.itens = this.itens.filter((item) => item.userId !== userId);
    this.salvarNoLocalStorage();
    this.notificarAtualizacao();
  }

  getTaskById(id: number) {
    return this.itens.find((task) => task.id === id);
  }

  updateTask(updatedTask: Item) {
    this.itens = this.itens.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );

    //FIXME: this.itens[Index] = updatedTask;
    this.salvarNoLocalStorage();
    this.notificarAtualizacao();
  }

  private salvarNoLocalStorage() {
    localStorage.setItem('listaDeCompras', JSON.stringify(this.itens));
  }

  private carregarDoLocalStorage() {
    const dados = localStorage.getItem('listaDeCompras');
    return dados ? JSON.parse(dados) : [];
  }

  private notificarAtualizacao() {}
}
