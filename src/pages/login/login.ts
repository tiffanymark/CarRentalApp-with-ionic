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
    adress: '',
    phone: '',
    birthday: '',
    email: '',
    username: '',
    password: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public platform: Platform, public alertCtrl: AlertController) {
    this.menuCtrl.enable(false,"logon");

    this.platform.ready().then(() => {
    this.db = new SQLite();
      this.db.openDatabase({
          name: "CarRental.db",
          location: "default"
      }).then(() => {
          this.db.executeSql("CREATE TABLE IF NOT EXISTS user (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT, adress TEXT, phone TEXT, birthday TEXT, email TEXT, username TEXT, password TEXT)", {}).then((data) => {
            console.log("TABLE CREATED: ", data);
          }, (error) => {
              console.error("Unable to execute sql", error);
          })
        }, (error) => {
          console.error("Unable to open database", error);
        });
    });

  }

  login(){
    this.db.executeSql("SELECT * FROM user WHERE username = ? AND password = ?", [this.user.username, this.user.password]).then((data) => {
      console.log("LENGTH: ",data.rows.length);
      if(data.rows.length == 1){
        console.log("FOUND");
        this.navCtrl.push(Home);
      }
      else{
        let alert = this.alertCtrl.create({
          title: 'User not found',
          subTitle: 'Your username or password is incorrect. Please try again.',
          buttons: ['OK']
        });
        alert.present();
      }
    }, (error) => {
        console.error("Unable to execute sql", error);
    });
  }

  
  
  createAccount(){
    this.navCtrl.push(CreateAccount);
  }

}
