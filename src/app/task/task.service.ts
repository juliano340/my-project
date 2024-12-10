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

  private itens: Item[] = this.loadFromLocalStorage();
  private users: User[] = this.userService.getUsers();

  getUsuarios() {
    return this.users;
  }

  getItensPorUsuario(userId: number) {
    return this.itens.filter((item) => item.userId === userId);
  }

  getItens() {
    return this.itens;
  }

  addItem(nome: string, categoria: string, userId: number) {
    if (nome.trim()) {
      const novoItem: Item = {
        id:
          this.itens.length > 0 ? this.itens[this.itens.length - 1].id + 1 : 1,
        nome,
        categoria,
        userId,
      };
      this.itens.push(novoItem);
      this.saveInLocalStorage();
    }
  }

  deleteItem(itemId: number) {
    const itemIndex = this.itens.findIndex((item) => item.id === itemId);
    this.itens.splice(itemIndex, 1);
    this.saveInLocalStorage();
  }

  clearLista(userId: number) {
    this.itens = this.itens.filter((item) => item.userId !== userId);
    this.saveInLocalStorage();
  }

  getItemPorId(id: number) {
    return this.itens.find((task) => task.id === id);
  }

  updateItem(updatedTask: Item) {
    const itemIndex = this.itens.findIndex(
      (item) => item.id === updatedTask.id
    );
    this.itens[itemIndex] = updatedTask;
    this.saveInLocalStorage();
  }

  private saveInLocalStorage() {
    localStorage.setItem('listaDeCompras', JSON.stringify(this.itens));
  }

  private loadFromLocalStorage() {
    const dados = localStorage.getItem('listaDeCompras');
    return dados ? JSON.parse(dados) : [];
  }
}
