
import { Component, Input, OnInit } from '@angular/core';
import { ClientConfig } from './shared/utility/angular-client.utility';
import { LoginData, CurrentAccountService } from './current-account.service';
import { Router } from '@angular/router';


@Component({
  selector: 'my-app',
  templateUrl: './login.component.html',
  providers: [ClientConfig]
  //, styleUrls: [ './dashboard.component.css' ]
})
export class LoginComponent implements OnInit {

   data: LoginData = {
       email: "",
       password: ""
   };

  /**
   * used to show form level errors to user
   * @type {string}
   */
  formErrorMessage: string = undefined;

  constructor(private clientConfig: ClientConfig,
              private currentAccountService: CurrentAccountService,
              private router: Router) {
    clientConfig.init();
  }

  ngOnInit(): void {

    this.formErrorMessage = undefined;

    console.log("Login Component init called");
    this.currentAccountService.currentAccount.subscribe(
      accountData => {
        console.log('login component got data', accountData);
      },
      // handle the error, otherwise will break the Observable
      error => console.log('login component got account error', error));

    //console.log('current user ', this.userApi.getCurrent().subscribe( (value: any) => console.log("user", value)) );
  }

  login(): void {
    console.log("login component: Login called", this.data);
    var self = this;
    this.currentAccountService.login(this.data, function (err, data) {
      if (err) {
        console.log("got error from login", err);
        self.formErrorMessage = err.message;
      } else {
        console.log('successful login', data);
        self.formErrorMessage = undefined;
        self.router.navigate(['/']);
      }
    });
  }

  logout(): void {
    console.log("logout called");
    this.currentAccountService.logout();
    this.router.navigate(['/']);
  }

}
