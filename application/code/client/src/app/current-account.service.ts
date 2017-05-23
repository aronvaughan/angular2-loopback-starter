import {Injectable, OnInit} from '@angular/core';
import { Observable }  from 'rxjs/Observable';
import { ReplaySubject } from 'rxjs/ReplaySubject';
import {Account} from "./shared/angular-client/models/Account";
import {AccountApi} from "./shared/angular-client/services/custom/Account";
import {AccessToken} from "./shared/angular-client/models/BaseModels";
import {Subject} from "rxjs";

export class LoginData {
  email: string;
  password: string;
}

export class PasswordResetData {
  newPass: string;
  confirmPass: string;
  token: string;
}

export class SignupData extends LoginData {
  fname: string;
  lname: string;
  username: string;
  termsAccept: boolean;
}


@Injectable()
export class CurrentAccountService implements OnInit {

  currentAccount: ReplaySubject<Account> = new ReplaySubject<Account>(1);
  accessToken: AccessToken = undefined;

  constructor(private accountApi: AccountApi) {
    console.log('current account service constructor called');
    this.getCurrent();
  }

  ngOnInit(): void {
    console.log('current account service init called');
    this.getCurrent();
  }

  protected pushAccountUpdate(account: any) {
    console.log('current account service sending account update', account);
    this.currentAccount.next(account);
  }

  /**
   * create a new user - will auto-login that user since we have all the necessary information
   *
   * @param signupData
   */
  create( signupData: SignupData, callback?: any): void {
    console.log('current account service creating user...', signupData);
    //var createdUser = new Observable<User>();
    this.accountApi.create(signupData).subscribe((accountData) =>
    {
      //(token: AccessToken)
      console.log("created account", accountData);
      //createdUser.next(userData);
      accountData.password = signupData.password;
      this.login(accountData);
      if (callback) {
        callback(null, accountData);
      }
    }, error => {
      console.log('signup error!', error);
      if (callback) {
        callback(error, undefined);
      }
    });
    //return createdUser;
  }

  /**
   * login a user
   *
   * @param loginInfo
   */
  login( loginInfo: LoginData, callback?: any ): void {

    console.log('login', loginInfo);
    this.accountApi.login({ email: loginInfo.email, password: loginInfo.password}, 'user').subscribe((accountData) =>
    {
      //(token: AccessToken)
      console.log("login data", accountData);
      this.accessToken = accountData.id;
      this.pushAccountUpdate(accountData.user);
      //alert('Fake Redirect');
      if (callback) {
        callback(null, accountData.user);
      }
    }, error => {
      console.log('login error!', error);
      if (callback) {
        callback(error, undefined);
      }
    });
  }

  /**
   * send a password reset email to the user with a short ttl token for access to this account
   * @param loginInfo
   */
  resetPassword( loginInfo: LoginData): void {
    this.accountApi.resetPassword(loginInfo).subscribe((accountData) =>
    {
      console.log('reset pass for account', accountData);

    }, error => {
      console.log('reset pass!', error);

    });
  }

  /**
   * how do we return observable and avoid a callback function for errors...
   * @param loginInfo
   * @returns {Subject<any>}
   */
  resetPassword2( loginInfo: LoginData ): Observable<any> {
    console.log('resetPassword2 called', loginInfo);

    return this.accountApi.resetPassword(loginInfo).map(
      (accountData) =>
    {
      console.log('reset pass for account', accountData);
      return accountData;

    }).catch((e) => {
      console.log('resetpassword2 caught error, rethrowing....', e);
      Observable.throw(e)
    });
  }

  /**
   * the user has returned to our website with a password reset token, send new password along with token
   * for server validation and password change
   * NOTE: if the token is not valid it will be removed from the user account (generally happens when the ttl has expired
   * - afterwards the token will not be found (vs being found invalid)
   * @param passwordResetData
   */
  changePasswordForgot( passwordResetData: PasswordResetData): void {
    console.log('change Password called', passwordResetData);
    this.accountApi.changePasswordForgot(passwordResetData.newPass,
      passwordResetData.confirmPass, passwordResetData.token).subscribe((accountData) =>
    {
      console.log('change password forgot', accountData);

    }, error => {
      console.log('change pass forgot!', error);
    });
  }

  /**
   * get the current/active user
   * @returns {ReplaySubject<Account>}
   */
  getCurrent() : Observable<Account> {
    console.log('curent account service, getting current account');
    //this.userApi.getCurrent().subscribe( (value: any) => this.pushAccountUpdate(value));

    this.accountApi.getCurrent().subscribe(
      accountData => {
        console.log('current account service got data', accountData);
        this.pushAccountUpdate(accountData);
      },
      // handle the error, otherwise will break the Observable
      error => {
        console.log('account service got account error', error);
        this.pushAccountUpdate(undefined);
      });

    return this.currentAccount;
  }

  /**
   * logout this user
   */
  logout(): void {
    console.log("logout called");
    this.accountApi.logout();
    this.pushAccountUpdate(undefined);
  }

}
