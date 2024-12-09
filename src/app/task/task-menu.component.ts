import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-menu',
  templateUrl: './task-menu.component.html',
  styleUrls: ['./task-menu.component.css'],
})
export class TaskMenuComponent implements OnInit {
  isAdmin: boolean = false;

  ngOnInit(): void {
    const loggedInUser = JSON.parse(
      localStorage.getItem('loggedInUser') || '{}'
    );
    this.isAdmin = loggedInUser?.role === 'admin';
  }
}
