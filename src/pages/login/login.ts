import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { CreateAccount } from '../create-account/create-account';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {

  constructor(public navCtrl: NavController, public navParams: NavParams) {

  }

  
  
  createAccount(){
    this.navCtrl.push(CreateAccount);
  }

}
