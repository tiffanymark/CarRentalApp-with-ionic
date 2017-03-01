import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, Platform, AlertController } from 'ionic-angular';
import { Home } from  '../home/home';
import { CreateAccount } from '../create-account/create-account';
import { Database } from '../../providers/database';
import { LocalStorage } from '../../providers/local-storage';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {

  public user = {
    firstname: '',
    lastname: '',
    address: '',
    phone: '',
    birthday: '',
    email: '',
    username: '',
    password: ''
  };


  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public platform: Platform, public alertCtrl: AlertController, private database: Database, private localStorage: LocalStorage) {

    this.menuCtrl.enable(false,"logon");
    
  }

  invalidLoginForm(){
    if (this.user.username.length == 0 || this.user.password.length == 0) return true ;
                     return false ;
  }

  login(){
    this.database.userAuth(this.user.username,this.user.password).then((user_id) => {
      console.log("USER ID: ", user_id);
      if(user_id != null){
          console.log("FOUND");
          this.localStorage.setUserId(user_id);
          this.localStorage.setUserLogon(true);
          this.menuCtrl.enable(true,"logon");
          this.navCtrl.setRoot(Home);
        }
        else{
          let alertNotFound = this.alertCtrl.create({
            title: 'User not found',
            subTitle: 'Your username or password is incorrect. Please try again.',
            buttons: ['OK']
          });
          alertNotFound.present();
        }
      });
      
  }
  
  createAccount(){
    this.navCtrl.push(CreateAccount);
  }

}
