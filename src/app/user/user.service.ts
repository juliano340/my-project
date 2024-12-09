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
    }
  }
}
