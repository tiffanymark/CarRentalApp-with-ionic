import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, Platform, AlertController } from 'ionic-angular';
import { SQLite } from 'ionic-native';
import { Home } from  '../home/home';
import { CreateAccount } from '../create-account/create-account';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class Login {

  public db: SQLite;

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


  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public platform: Platform, public alertCtrl: AlertController) {
    this.menuCtrl.enable(false,"logon");

    this.platform.ready().then(() => {
    this.db = new SQLite();
      this.db.openDatabase({
          name: "CarRental.db",
          location: "default"
      }).then(() => {this.db.executeSql("CREATE TABLE IF NOT EXISTS user_account (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT, address TEXT, phone TEXT, birthday TEXT, email TEXT, username TEXT, password TEXT)", {}).then((data) => {
              console.log("TABLE CREATED: ", data);
          }, (error) => {
              console.error("Unable to execute sql", error);
          })
        }, (error) => { 
          console.error("Unable to open database", error);
        });
    });

  }

  invalidLoginForm(){
    if (this.user.username.length == 0 || this.user.password.length == 0) return true ;
                     return false ;
  }

  login(){
    this.db.executeSql("SELECT * FROM user_account WHERE username = ? AND password = ?", [this.user.username, this.user.password]).then((data) => {
      console.log("LENGTH: ",data.rows.length);
      if(data.rows.length == 1){
        console.log("FOUND");
        console.log("NAME: ",data.rows.item(0).firstname);
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
    }, (error) => {
        console.error("Unable to execute sql", error);
    });
  }
  
  createAccount(){
    this.navCtrl.push(CreateAccount);
  }

}
