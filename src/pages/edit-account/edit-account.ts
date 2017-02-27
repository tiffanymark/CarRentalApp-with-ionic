import { Component } from '@angular/core';
import { NavController, NavParams, ViewController, MenuController, Events } from 'ionic-angular';
import { LocalStorage } from '../../providers/local-storage';
import { Database } from '../../providers/database';

@Component({
  selector: 'page-edit-account',
  templateUrl: 'edit-account.html'
})
export class EditAccount {

  users: Array<{
    firstname: string,
    lastname: string,
    address: string,
    phone: string,
    birthday: string,
    email: string,
    username: string
  }>;

  id: any;

  public mask: Array<string | RegExp>

  constructor(public navCtrl: NavController, public navParams: NavParams, public viewCtrl: ViewController, public menuCtrl: MenuController, public events: Events, private localStorage : LocalStorage, private database: Database) {
    this.menuCtrl.enable(false, "logon");

    this.mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

    this.localStorage.getUserId().then((data) => {
      this.id = data;
      this.database.searchUser(data).then((data)=>{
        this.users = [{
          firstname: data.firstname,
          lastname: data.lastname,
          address: data.address,
          phone: data.phone,
          birthday: data.birthday,
          email: data.email,
          username: data.username
        }]
      });
    });

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
    if(this.users[0].phone.toString().length > 15){
      this.users[0].phone = this.users[0].phone.slice(0,15);
    }
    this.database.updateUserAccount(this.users[0].address, this.users[0].phone, this.users[0].email,this.id).then((data) => {
      console.log("UPDATED USER ACCOUNT");
    });
    this.events.publish('reloadProfile');
    this.navCtrl.pop();
  }


}
