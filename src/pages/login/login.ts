import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';

import { CreateAccount } from '../create-account/create-account';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
    this.menuCtrl.enable(false,"logon");
  }


  
  createAccount(){
    this.navCtrl.push(CreateAccount);
  }

}
