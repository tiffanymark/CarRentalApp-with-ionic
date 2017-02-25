import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, Platform, AlertController } from 'ionic-angular';
import { Home } from  '../home/home';
import { CreateAccount } from '../create-account/create-account';
import { Database } from '../../providers/database';

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


  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public platform: Platform, public alertCtrl: AlertController, private database: Database) {

    this.menuCtrl.enable(false,"logon");
    
  }

  invalidLoginForm(){
    if (this.user.username.length == 0 || this.user.password.length == 0) return true ;
                     return false ;
  }

  login(){
    this.database.userAuth(this.user.username,this.user.password).then((data) => {
      console.log("USER ID: ",data);
      if(data != null){
          console.log("FOUND");
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
