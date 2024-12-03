import { Component } from '@angular/core';
import { User } from '../users.model';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent {
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

    this.message = 'Usuário registrado com sucesso!';
  }
}
