
import { Component, Input, OnInit } from '@angular/core';
import { ClientConfig } from './shared/utility/angular-client.utility';
import { CurrentAccountService, SignupData} from './current-account.service';

@Component({
  selector: 'my-app',
  templateUrl: './reset-password-request.component.html',
  providers: [ClientConfig]
})
export class ResetPasswordRequestComponent {

  data: SignupData = new SignupData();

  constructor(private clientConfig: ClientConfig, private currentAccountService: CurrentAccountService) {
    clientConfig.init();
  }

  resetPasswordRequest(): void {
    console.log("pass rest request component: reset request called", this.data);
    this.currentAccountService.resetPassword(this.data);
  }

}
