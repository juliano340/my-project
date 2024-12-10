import { Injectable } from '@angular/core';
import { User } from './users.model';
import * as bcrypt from 'bcryptjs';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private router: Router, private snackBar: MatSnackBar) {}

  getUsers() {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    return users;
  }

  login(email: string, password: string) {
    const users = this.getUsers();

    const user = users.find((u: User) => u.email === email);

    if (user) console.log(user);

    if (user && bcrypt.compareSync(password, user.password)) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      this.router.navigate(['/exibir']);
      return;
    } else {
      this.snackBar.open('Usuário ou senha incorretos', 'Fechar', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    }
  }

  register(name: string, email: string, password: string, role: string) {
    const users = this.getUsers();

    let user: User = {
      id: users.length > 0 ? users.length + 1 : 1,
      name,
      email,
      password,
      role,
    };

    const salt = bcrypt.genSaltSync(10);

    user.password = bcrypt.hashSync(user.password, salt);

    users.push({ ...user });

    localStorage.setItem('users', JSON.stringify(users));

    user = {
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

    this.router.navigate(['/login']);

    console.log(user);
  }
}
