import { Injectable } from '@angular/core';

interface Item {
  id: number;
  nome: string;
  categoria: string;
  userId: number;
}

@Injectable({
  providedIn: 'root',
})
export class ListaServiceService {
  private itens: Item[] = this.carregarDoLocalStorage();

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
        nome,
        categoria,
        userId,
      };
      this.itens.push(novoItem);
      this.salvarNoLocalStorage();
    }
  }

  removerItem(itemId: number, userId: number): void {
    this.itens = this.itens.filter(
      (item) => !(item.id === itemId && item.userId === userId)
    );
    this.salvarNoLocalStorage();
  }

  limparLista(userId: number): void {
    this.itens = this.itens.filter((item) => item.userId !== userId);
    this.salvarNoLocalStorage();
  }
  private salvarNoLocalStorage(): void {
    localStorage.setItem('listaDeCompras', JSON.stringify(this.itens));
  }

  private carregarDoLocalStorage(): Item[] {
    const dados = localStorage.getItem('listaDeCompras');
    return dados ? JSON.parse(dados) : [];
  }
}
