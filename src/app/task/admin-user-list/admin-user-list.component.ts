import { Component, OnInit } from '@angular/core';
import { ListaServiceService } from '../lista-service.service';

@Component({
  selector: 'app-admin-user-list',
  templateUrl: './admin-user-list.component.html',
  styleUrls: ['./admin-user-list.component.css'],
})
export class AdminUserListComponent implements OnInit {
  users: any[] = []; // Dados dos usuários para exibir na tabela

  constructor(private listaService: ListaServiceService) {}

  ngOnInit(): void {
    this.users = this.listaService.getAllUsers(); // Busca os usuários do serviço
  }
}
