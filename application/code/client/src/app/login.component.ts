
import { Component, Input, OnInit } from '@angular/core';
import { ClientConfig } from './shared/utility/angular-client.utility';
import { LoginData, CurrentAccountService } from './current-account.service';
import {Router, ActivatedRoute} from '@angular/router';
import {BaseComponent} from "./base.component";


@Component({
  selector: 'my-app',
  templateUrl: './login.component.html',
  providers: [ClientConfig]
  //, styleUrls: [ './dashboard.component.css' ]
})
export class LoginComponent extends BaseComponent implements OnInit {

   data: LoginData = {
       email: "",
       password: ""
   };

   url: string = undefined;


  constructor(private clientConfig: ClientConfig,
              private currentAccountService: CurrentAccountService,
              private router: Router,
              private route: ActivatedRoute) {

    super(clientConfig);

    this.route.params.subscribe( params => {
      this.url = params['url'];
      console.log('url passed in ', this.url);
    });
  }

  ngOnInit(): void {

    this.clearErrorMessage();

    console.log("Login Component init called");
    this.currentAccountService.currentAccount.subscribe(
      accountData => {
        console.log('login component got data', accountData);
      },
      // handle the error, otherwise will break the Observable
      error => console.log('login component got account error', error));

    //console.log('current user ', this.userApi.getCurrent().subscribe( (value: any) => console.log("user", value)) );
  }

  navigateAfterLogin(): void {
    if (this.url) {
      console.log('custom url entered', this.url);
      this.router.navigate([this.url]);
    } else {
      console.log('default url /');
      this.router.navigate(['/']);
    }
  }

  navigateAfterLogout(): void {
    this.navigateAfterLogin();
  }

  login(): void {
    console.log("login component: Login called", this.data);
    var self = this;
    this.currentAccountService.login(this.data, function (err: any, data: any) {
      if (err) {
        console.log("got error from login", err);
        self.setErrorMessage(err.message);
      } else {
        console.log('successful login', data);
        self.clearErrorMessage();
        self.navigateAfterLogin();
      }
    });
  }

  logout(): void {
    console.log("logout called");
    this.currentAccountService.logout();
    this.navigateAfterLogout();
  }

}
