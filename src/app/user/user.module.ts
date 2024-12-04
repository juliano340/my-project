import { CommonComponentsModule } from './../common/common.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UserRegisterComponent } from './user-register/user-register.component';
import { UserLoginComponent } from './user-login/user-login.component';

@NgModule({
  declarations: [UserRegisterComponent, UserLoginComponent],
  imports: [CommonModule, FormsModule],
  exports: [UserRegisterComponent],
})
export class UserModule {}
