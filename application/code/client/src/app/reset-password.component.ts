
import { Component, Input, OnInit } from '@angular/core';
import { ClientConfig } from './shared/utility/angular-client.utility';
import {CurrentAccountService, SignupData, PasswordResetData} from './current-account.service';
import { ActivatedRoute }     from '@angular/router';

@Component({
  selector: 'my-app',
  templateUrl: './reset-password.component.html',
  providers: [ClientConfig]
})
export class ResetPasswordComponent {

  data: PasswordResetData = new PasswordResetData();

  errorMessage: string = undefined;

  token: string = undefined;

  constructor(private clientConfig: ClientConfig, private currentAccountService: CurrentAccountService, private route: ActivatedRoute) {
    clientConfig.init();

    this.route.params.subscribe( params => {
      this.token = params['access_token'];
      console.log('token update', this.token);
      this.data.token = this.token;
    });
  }

  resetPassword(): void {
    console.log("pass reset component:", this.data);

    if (this.data.newPass != this.data.confirmPass) {
      console.log('passwords do not match...');
      this.errorMessage = "Passwords do not match, try again.";
    }

    if (this.token) {
      console.log('resetting password', this.token, this.data);
      this.currentAccountService.changePasswordForgot(this.data);
    } else {
      console.log('token not found, reset not possible');
    }
  }

}
