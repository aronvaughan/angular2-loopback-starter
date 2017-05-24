
import { Component, Input, OnInit } from '@angular/core';
import { ClientConfig } from './shared/utility/angular-client.utility';
import {CurrentAccountService} from "./current-account.service";
import {Account} from "./shared/angular-client/models/Account";

@Component({
  selector: 'login-menu',
  templateUrl: './login-menu.component.html',
  providers: [ClientConfig]
})
export class LoginMenuComponent implements OnInit {

  account : any = undefined;

  constructor(protected clientConfig: ClientConfig, private currentAccountService: CurrentAccountService) {
    clientConfig.init();
  }

  ngOnInit(): void {

    console.log("Login Menu Component init called");
    this.currentAccountService.currentAccount.subscribe(
      userData => {
        console.log('login menu component got data', userData);
        this.account = this.clientConfig.extend(userData, Account);
        //this.account = userData;
      },
      // handle the error, otherwise will break the Observable
      error => console.log('login menu component got user error', error));
  }

  logout(): void {
    console.log("logout called");
    this.currentAccountService.logout();
  }


}
