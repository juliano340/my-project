import { Component, OnInit } from '@angular/core';
import { ListaServiceService } from './lista-service.service';
import { User } from '../user/users.model';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css'],
})
export class AdminUserListComponent implements OnInit {
  // FIXME: 11
  users: User[] = [];

  constructor(private listaService: ListaServiceService) {}

  ngOnInit(): void {
    this.users = this.listaService.getAllUsers();
  }
}
