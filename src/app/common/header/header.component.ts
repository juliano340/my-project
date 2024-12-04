import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(private router: Router) {}

  isLoggedIn(): boolean {
    return !!localStorage.getItem('loggedInUser');
  }

  getLoggedInUserName(): string {
    const user = JSON.parse(localStorage.getItem('loggedInUser') || '{}');
    return user?.name || '';
  }

  logout(): void {
    localStorage.removeItem('loggedInUser');
    alert('Você saiu com sucesso.');
    this.router.navigate(['/login']);
  }
}
