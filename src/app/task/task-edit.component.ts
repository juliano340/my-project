import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ListaService } from './task.service';
import { Item } from './task.model';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css'],
})
export class TaskEditComponent implements OnInit {
  task: Item | undefined = undefined;
  categorias = ['Alimentos', 'Tarefas', 'Compras', 'Outros'];
  editForm: FormGroup = new FormGroup({});
  originalTask: Item | undefined = undefined;

  constructor(
    private route: ActivatedRoute,
    private listaService: ListaService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.initializeForm();
    const taskId = Number(this.route.snapshot.paramMap.get('id'));
    this.task = this.listaService.getItemPorId(taskId);

    if (this.task) {
      this.originalTask = { ...this.task };
    }
  }

  initializeForm() {
    this.editForm = this.fb.group({
      nome: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
    });
  }

  submitForm() {
    console.log('SUBMETEU! FORM');
  }

  salvar() {
    if (!this.editForm.valid) {
      this.snackBar.open('Preencha todos os campos corretamente!', 'Fechar', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    if (this.task) {
      this.listaService.updateItem(this.task);
      this.router.navigate(['/admin/tasks', this.task.userId]);
    }
  }
  cancelar() {
    if (!this.editForm.valid && this.originalTask) {
      this.editForm.patchValue(this.originalTask);
    }

    if (this.task) {
      this.router.navigate(['/admin/tasks', this.task.userId]);
    }
  }
}
