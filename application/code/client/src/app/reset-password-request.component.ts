
import { Component, Input, OnInit } from '@angular/core';
import { ClientConfig } from './shared/utility/angular-client.utility';
import { CurrentAccountService, SignupData} from './current-account.service';
import {BaseComponent} from "./base.component";

@Component({
  selector: 'my-app',
  templateUrl: './reset-password-request.component.html',
  providers: [ClientConfig]
})
export class ResetPasswordRequestComponent extends BaseComponent {

  data: SignupData = new SignupData();

  constructor(private clientConfig: ClientConfig, private currentAccountService: CurrentAccountService) {
    super(clientConfig);
  }

  resetPasswordRequest(): void {
    console.log("pass rest request component: reset request called", this.data);
    //this.currentAccountService.resetPassword(this.data);
    this.currentAccountService.resetPassword2(this.data).catch((e) => {
      console.log('reset passwod request component caught error, rethrowing....', e);
      this.setErrorMessage(e);
    })
  }

}
