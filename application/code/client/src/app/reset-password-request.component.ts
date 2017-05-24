
import { Component, Input, OnInit } from '@angular/core';
import { ClientConfig } from './shared/utility/angular-client.utility';
import { CurrentAccountService, SignupData} from './current-account.service';
import { BaseComponent } from "./base.component";
import { ComponentSubscriberUtility } from "./shared/utility/component-subscriber-utility";


@Component({
  selector: 'my-app',
  templateUrl: './reset-password-request.component.html',
  providers: [ClientConfig]
})
export class ResetPasswordRequestComponent extends BaseComponent {

  data: SignupData = new SignupData();
  subscriberUtility: ComponentSubscriberUtility = new ComponentSubscriberUtility(this);

  constructor(protected clientConfig: ClientConfig, private currentAccountService: CurrentAccountService) {
    super(clientConfig);
  }

  resetPasswordRequest(): void {
    console.log("pass rest request component: reset request called", this.data);
    this.subscriberUtility.subscribe(this.currentAccountService.resetPassword2(this.data));
  }

}
