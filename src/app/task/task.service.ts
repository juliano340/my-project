import { UserService } from './../user/user.service';
import { Injectable } from '@angular/core';
import { Item } from './task.model';
import { User } from '../user/users.model';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ListaService {
  constructor(private userService: UserService, private http: HttpClient) {}

  private apiUrl = 'http://localhost:5231/api/WorkItems';
  private itens: Item[] = this.loadFromLocalStorage();
  private users: User[] = this.userService.getUsers();

  getAll(): Observable<Item[]> {
    return this.http.get<Item[]>(this.apiUrl);
  }
  addItem(nome: string, categoria: string, userId: number): Observable<any> {
    const newItem = {
      nome,
      categoria,
      userId,
    };

    return this.http.post(`${this.apiUrl}`, newItem).pipe(
      catchError((error) => {
        console.error('Erro ao adicionar item:', error);
        return throwError(() => error);
      })
    );
  }

  getById(id: number): Observable<any> {
    return this.http.get<Item>(`${this.apiUrl}/${id}`);
  }

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

  deleteItem(itemId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${itemId}`);
  }

  clearLista(userId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/all/${userId}`);
  }

  private saveInLocalStorage() {
    localStorage.setItem('listaDeCompras', JSON.stringify(this.itens));
  }
  private loadFromLocalStorage() {
    const dados = localStorage.getItem('listaDeCompras');
    return dados ? JSON.parse(dados) : [];
  }
}
