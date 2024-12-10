import { UserService } from './../user/user.service';
import { Component, OnInit } from '@angular/core';
import { ListaService } from './task.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adicionar-item',
  templateUrl: './adicionar-item.component.html',
  styleUrls: ['./adicionar-item.component.css'],
})
export class AdicionarItemComponent implements OnInit {
  // FIXME: 11
  erroMensagem = '';
  categorias = ['Alimentos', 'Tarefas', 'Compras', 'Outros'];
  addForm: FormGroup = new FormGroup({});

  constructor(
    private listaService: ListaService,
    private snackBar: MatSnackBar,
    private fb: FormBuilder,
    private UserService: UserService
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.addForm = this.fb.group({
      nome: ['', [Validators.required]],
      categoria: ['', [Validators.required]],
    });
  }

  submitForm() {
    if (!this.addForm.valid) {
      this.snackBar.open('Preencha todos os campos corretamente!', 'Fechar', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    const loggedInUser = this.UserService.getLoggedInUser();
    const userId = loggedInUser.id;
    this.listaService.addItem(
      this.addForm.value.nome,
      this.addForm.value.categoria,
      userId
    );
    this.snackBar.open('Item adicionado com sucesso!', 'Fechar', {
      duration: 3000,
      verticalPosition: 'top',
      horizontalPosition: 'right',
    });
    this.addForm.reset();
  }
}
