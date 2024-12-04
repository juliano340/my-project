import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { User } from '../users.model';
import * as bcrypt from 'bcryptjs';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router, private snackBar: MatSnackBar) {}

  login(): void {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const user = users.find((u: User) => u.email === this.email);

    if (user && bcrypt.compareSync(this.password, user.password)) {
      localStorage.setItem('loggedInUser', JSON.stringify(user));
      this.router.navigate(['/exibir']);
    } else {
      this.snackBar.open('Email ou senha incorretos', 'Fechar', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
    }

    this.email = '';
    this.password = '';
  }
}
