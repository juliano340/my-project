import { Component, OnInit } from '@angular/core';
import { User } from './users.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import * as bcrypt from 'bcryptjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from './user.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css'],
})
export class UserRegisterComponent implements OnInit {
  registerForm: FormGroup = new FormGroup({});

  constructor(
    private snackBar: MatSnackBar,
    private router: Router,
    private fb: FormBuilder,
    private userService: UserService
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(1)]],
      role: ['', [Validators.required]],
    });
  }

  submitForm() {
    if (!this.registerForm.valid) {
      this.snackBar.open('Preencha todos os campos corretamente!', 'Fechar', {
        duration: 2000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
      });
      return;
    }

    this.userService.register(
      this.registerForm.value.name,
      this.registerForm.value.email,
      this.registerForm.value.password,
      this.registerForm.value.role
    );
  }
}
