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
  
  getItens(): Item[] {
    return this.itens;
  }
  
  adicionarItem(nome: string, categoria: string): void {
    if (nome.trim()) {
      this.itens.push({ nome, categoria }); 
      this.salvarNoLocalStorage(); 
    }
  }
  
  removerItem(index: number): void {
    this.itens.splice(index, 1);
    this.salvarNoLocalStorage(); 
  }

    limparLista(): void {
    this.itens = []; 
    localStorage.removeItem('listaDeCompras'); 
  }
    private salvarNoLocalStorage(): void {
    localStorage.setItem('listaDeCompras', JSON.stringify(this.itens));
  }

    private carregarDoLocalStorage(): Item[] {
    const dados = localStorage.getItem('listaDeCompras');
    return dados ? JSON.parse(dados) : []; 
  }
}
