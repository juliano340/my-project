import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaServiceService } from './lista-service.service';
import { Item } from './task.model';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css'],
})
export class TaskEditComponent implements OnInit {
  task: Item | undefined = undefined;

  categorias = ['Alimentos', 'Tarefas', 'Compras', 'Outros'];

  constructor(
    private route: ActivatedRoute,
    private listaService: ListaServiceService,
    private router: Router
  ) {}

  ngOnInit() {
    const taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.task = this.listaService.getTaskById(taskId);
  }

  salvar() {
    if (this.task) {
      this.listaService.updateTask(this.task);
      this.router.navigate(['/admin/tasks', this.task.userId]);
    }
  }
  cancelar() {
    if (this.task) this.router.navigate(['/admin/tasks', this.task.userId]);
  }
}
