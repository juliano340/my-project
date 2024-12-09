import { CommonComponentsModule } from './../common/common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserRegisterComponent } from './user-register.component';
import { UserLoginComponent } from './user-login.component';
import { RouterLink } from '@angular/router';

@NgModule({
  declarations: [UserRegisterComponent, UserLoginComponent],
  imports: [CommonModule, FormsModule, RouterLink],
  exports: [UserRegisterComponent],
})
export class UserModule {}
