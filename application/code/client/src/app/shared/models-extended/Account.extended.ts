import { Account } from '../angular-client/models/Account';

export class AccountExtended extends Account {

  constructor(json: Account) { super(json); }

  /**
   * get the name to display for the user - if the username is undefined, return the email as the username
   * @returns {string}
   */
  getUserDisplayName() : string {
    console.log('get display name called', this.username, this.email);
    if (this.username) {
      return this.username;
    }
    else {
      return this.email;
    }
  }
}
