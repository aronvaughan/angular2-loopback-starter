import { Injectable, Inject, Optional } from '@angular/core';
import { LoopBackConfig, Account } from '../angular-client/index';
//import { Account } from '../angular-client/models';
import {AccountExtended } from '../models-extended/Account.extended';

@Injectable()
export class ClientConfig {


  public init(): void {
    LoopBackConfig.setBaseURL('http://127.0.0.1:3002');
    LoopBackConfig.setApiVersion('api');
  }

  public extend(baseObject: any, clazz: any) : any {
    console.log('client config, extend called', baseObject, clazz.getModelName()  );

    //if undefined - leave undefined
    if (!baseObject) {
      console.log('base object is undefined, returning undefined');
      return baseObject;
    }

    //handle each class extension and wrap base json data into extended class
    if (clazz === Account) {
      var accountExtended : AccountExtended = new AccountExtended(baseObject);
      console.log('extending account model with account Extended', accountExtended);
      return accountExtended;
    }

    //return the default object if no extension was found
    return baseObject;

  }

}
