import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-lista-tarefas',
  standalone: true,
  imports: [CommonModule], // Importamos o CommonModule aqui
  templateUrl: './lista-tarefas.component.html',
  styleUrls: ['./lista-tarefas.component.css']
})
export class ListaTarefasComponent {
  tarefas = ['Estudar Angular', 'Praticar TypeScript', 'Construir projetos'];

  adicionarTarefa(novaTarefa: string) {
    if (novaTarefa.trim()) {
      this.tarefas.push(novaTarefa);
    }
  }
}
