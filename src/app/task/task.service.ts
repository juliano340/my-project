import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import { Item } from './task.model';
import { User } from '../user/users.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ListaService {
  constructor(private userService: UserService, private http: HttpClient) {}

  private apiUrl = 'http://localhost:5231/api/WorkItems';
  private itens: Item[] = this.loadFromLocalStorage();
  private users: User[] = this.userService.getUsers();

  // TESTE CRIEI O METODO ABAIXO:
  getAll(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }
  // TESTE CRIEI O METODO ABAIXO (Dupliquei o método para fazer integração com a API):
  addItem(nome: string, categoria: string, userId: number): Observable<any> {
    const newItem = {
      nome,
      categoria,
      userId,
    };

    return this.http.post(`${this.apiUrl}`, newItem);
  }
  // TESTE CRIEI O METODO ABAIXO:
  getById(id: number): Observable<any> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`);
  }

  // TESTE CRIEI O METODO ABAIXO:
  updateItem(
    id: number,
    nome: string,
    categoria: string,
    userId: number
  ): Observable<any> {
    return this.http.put(`${this.apiUrl}`, { id, nome, categoria, userId });
  }

  getUsuarios() {
    return this.users;
  }

  getItensPorUsuario(userId: number) {
    return this.itens.filter((item) => item.userId === userId);
  }

  getItens() {
    return this.itens;
  }

  // RETIREI O METODO ABAIXO:
  // addItem(nome: string, categoria: string, userId: number) {
  //   if (nome.trim()) {
  //     const novoItem: Item = {
  //       id:
  //         this.itens.length > 0 ? this.itens[this.itens.length - 1].id + 1 : 1,
  //       nome,
  //       categoria,
  //       userId,
  //     };
  //     this.itens.push(novoItem);
  //     this.saveInLocalStorage();
  //   }
  // }

  deleteItem(itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${itemId}`);
  }

  // deleteItem(itemId: number) {
  //   const itemIndex = this.itens.findIndex((item) => item.id === itemId);
  //   this.itens.splice(itemIndex, 1);
  //   this.saveInLocalStorage();
  // }

  clearLista(userId: number) {
    this.itens = this.itens.filter((item) => item.userId !== userId);
    this.saveInLocalStorage();
  }

  getItemPorId(id: number) {
    return this.itens.find((task) => task.id === id);
  }

  // updateItem(updatedTask: Item) {
  //   const itemIndex = this.itens.findIndex(
  //     (item) => item.id === updatedTask.id
  //   );
  //   this.itens[itemIndex] = updatedTask;
  //   this.saveInLocalStorage();
  // }

  private saveInLocalStorage() {
    localStorage.setItem('listaDeCompras', JSON.stringify(this.itens));
  }

  private loadFromLocalStorage() {
    const dados = localStorage.getItem('listaDeCompras');
    return dados ? JSON.parse(dados) : [];
  }
}
