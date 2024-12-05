import { Component } from '@angular/core';
import { User } from '../users.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent {
  constructor(private snackBar: MatSnackBar, private router: Router) {}

  user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    role: '',
  };

  register(): void {
    const users: User[] = JSON.parse(localStorage.getItem('users') || '[]');

    this.user.id = users.length > 0 ? users[users.length - 1].id + 1 : 1;

    const salt = bcrypt.genSaltSync(10);
    this.user.password = bcrypt.hashSync(this.user.password, salt);

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
      horizontalPosition: 'right',
    });

    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 2000);
  }
}
