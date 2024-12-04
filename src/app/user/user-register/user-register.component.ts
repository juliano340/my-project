import { Component } from '@angular/core';
import { User } from '../users.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent {
  constructor(private snackBar: MatSnackBar) {}

  user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    role: '',
  };

  message = '';

  register(): void {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    this.user.id = users.length > 0 ? users[users.length - 1].id + 1 : 1;

    users.push({ ...this.user });

    localStorage.setItem('users', JSON.stringify(users));

    this.user = {
      id: 0,
      name: '',
      email: '',
      password: '',
      role: 'user',
    };

    this.snackBar.open('Usuário adicionado com sucesso!', 'Fechar', {
      duration: 2000,
      verticalPosition: 'top',
    });
  }
}
