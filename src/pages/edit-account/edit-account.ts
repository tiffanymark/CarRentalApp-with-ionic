import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, MenuController } from 'ionic-angular';

@Component({
  selector: 'page-edit-account',
  templateUrl: 'edit-account.html'
})
export class EditAccount {

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public menuCtrl: MenuController) {
    this.menuCtrl.enable(false, "logon");
  }

  noChange(){
    return false;
  }

  dismiss(){
    this.menuCtrl.enable(true, "logon");
    this.viewCtrl.dismiss();
  }

  save(){
    this.menuCtrl.enable(true, "logon");
    this.viewCtrl.dismiss();
  }


}
