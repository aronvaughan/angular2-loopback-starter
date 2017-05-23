
import { Component, Input, OnInit } from '@angular/core';
import { ClientConfig } from './shared/utility/angular-client.utility';
import {CurrentAccountService, SignupData, PasswordResetData} from './current-account.service';
import { ActivatedRoute }     from '@angular/router';

@Component({
  selector: 'my-app',
  providers: [ClientConfig]
})
export class BaseComponent {

  /**
   * used to show page level errors to user
   * @type {string}
   */
  errorMessage: string = undefined;

  constructor(private clientConfig: ClientConfig) {
    //initialize the generated client library for talking with our server
    clientConfig.init();
  }

  clearErrorMessage() : void {
    this.errorMessage = undefined;
  }

  setErrorMessage(message: string) : void {
    this.errorMessage = message;
  }

}
