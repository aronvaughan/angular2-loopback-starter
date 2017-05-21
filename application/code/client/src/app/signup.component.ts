
import { Component, Input, OnInit } from '@angular/core';
import { ClientConfig } from './shared/utility/angular-client.utility';
import { CurrentAccountService, SignupData} from './current-account.service';

@Component({
  selector: 'my-app',
  templateUrl: './signup.component.html',
  providers: [ClientConfig]
})
export class SignupComponent implements OnInit {

  data: SignupData = new SignupData();
  angular: any

  constructor(private clientConfig: ClientConfig, private currentAccountService: CurrentAccountService) {
    clientConfig.init();
  }

  ngOnInit(): void {

    console.log("Signup Component init called");
    this.currentAccountService.currentAccount.subscribe(
      userData => {
        console.log('signup component got data', userData);
      },
      // handle the error, otherwise will break the Observable
      error => console.log('signup component got user error', error));

  }

  signup(): void {
    console.log("signup component: SignUp called", this.data);
    this.currentAccountService.create(this.data);
  }

}
