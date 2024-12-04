import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css'],
})
export class UserLoginComponent {
  email: string = '';
  password: string = '';
  message: string = '';

  constructor(private router: Router) {}

  login(): void {
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const user = users.find(
      (u: any) => u.email === this.email && u.password === this.password
    );

    if (user) {
      this.message = 'Login bem-sucedido!';

      localStorage.setItem('loggedInUser', JSON.stringify(user));

      this.router.navigate(['/adicionar']);
    } else {
      this.message = 'Credenciais inválidas. Tente novamente.';
    }

    this.email = '';
    this.password = '';
  }
}
