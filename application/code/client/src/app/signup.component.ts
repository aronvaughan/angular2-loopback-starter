
import { Component, OnInit } from '@angular/core';
import { ClientConfig } from './shared/utility/angular-client.utility';
import { CurrentAccountService, SignupData} from './current-account.service';
import { Router } from '@angular/router';
import {BaseComponent} from "./base.component";

@Component({
  selector: 'my-app',
  templateUrl: './signup.component.html',
  providers: [ClientConfig]
})
export class SignupComponent extends BaseComponent implements OnInit {

  data: SignupData = new SignupData();
  angular: any;

  constructor(private clientConfig: ClientConfig,
              private currentAccountService: CurrentAccountService,
  private router: Router) {
    super(clientConfig);
  }

  ngOnInit(): void {
    console.log("Signup Component init called");
    this.currentAccountService.currentAccount.subscribe(
      userData => {
        console.log('signup component got data', userData);
      },
      // handle the error, otherwise will break the Observable
      error => {
        console.log('signup component got user error', error);
      });
  }

  signup(): void {
    console.log("signup component: SignUp called", this.data);
    var self = this;
    this.currentAccountService.create(this.data, function (err: any, data: any) {
      if (err) {
        console.log("got error from signup", err);
        self.setErrorMessage(err.message);
      } else {
        console.log('successful login', data);
        self.clearErrorMessage();
        self.router.navigate(['/']);
      }
    });
  }

}
