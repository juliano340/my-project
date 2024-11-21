import { Injectable } from '@angular/core';

interface Item {
  nome: string;
  categoria: string;
}

@Injectable({
  providedIn: 'root'
})
export class ListaServiceService {
  private itens: Item[] = this.carregarDoLocalStorage();

  // Retorna os itens como um array de objetos
  getItens(): Item[] {
    return this.itens;
  }

  // Adiciona um novo item com nome e categoria
  adicionarItem(nome: string, categoria: string): void {
    if (nome.trim()) {
      this.itens.push({ nome, categoria }); // Adiciona o objeto ao array
      this.salvarNoLocalStorage(); // Salva após adicionar
    }
  }

  // Remove um item pelo índice
  removerItem(index: number): void {
    this.itens.splice(index, 1);
    this.salvarNoLocalStorage(); // Salva após remover
  }

  // Limpa todos os itens
  limparLista(): void {
    this.itens = []; // Limpa o array
    localStorage.removeItem('listaDeCompras'); // Remove do localStorage
  }

  // Salva os itens no LocalStorage
  private salvarNoLocalStorage(): void {
    localStorage.setItem('listaDeCompras', JSON.stringify(this.itens));
  }

  // Carrega os itens do LocalStorage
  private carregarDoLocalStorage(): Item[] {
    const dados = localStorage.getItem('listaDeCompras');
    return dados ? JSON.parse(dados) : []; // Converte JSON para array de objetos
  }
}
