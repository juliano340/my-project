import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaServiceService } from './lista-service.service';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css'],
})
export class TaskEditComponent implements OnInit {
  task: any = null;

  categorias = ['Alimentos', 'Tarefas', 'Compras', 'Outros'];

  constructor(
    private route: ActivatedRoute,
    private listaService: ListaServiceService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.task = this.listaService.getTaskById(taskId);
  }

  salvar() {
    if (this.task) {
      this.listaService.updateTask(this.task); // Atualiza a tarefa no serviço
      this.router.navigate(['/admin/tasks', this.task.userId]); // Redireciona para a lista de tarefas
    }
  }
  cancelar(): void {
    this.router.navigate(['/admin/tasks', this.task.userId]); // Redireciona sem salvar
  }
}
