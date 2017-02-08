import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';

@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html'
})
export class CreateAccount {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
    this.menuCtrl.enable(false,"logon");
  }

  public birthday = {
    date: '2017-01-01'
  }
  

}
