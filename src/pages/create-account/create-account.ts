import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, Platform} from 'ionic-angular';
import { SQLite } from 'ionic-native';
import { Login } from '../login/login';


@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html'
})
export class CreateAccount {

  public db: SQLite;

  public user = {
    firstname: '',
    lastname: '',
    adress: '',
    phone: '',
    birthday: '2017-01-01',
    email: '',
    username: '',
    password: ''
  }

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public platform: Platform) {
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

  newAccount(){
    this.db.executeSql("INSERT INTO user (firstname, lastname, adress, phone, birthday, email, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [this.user.firstname,this.user.lastname,this.user.adress,this.user.phone,this.user.birthday,this.user.email,this.user.username,this.user.password]).then((data) => {
            console.log(this.user.firstname,this.user.lastname,this.user.adress,this.user.phone,this.user.birthday,this.user.email,this.user.username,this.user.password);

            console.log("INSERTED: " + JSON.stringify(data));
        }, (error) => {
            console.log("ERROR: " + JSON.stringify(error.err));
        });
    this.navCtrl.push(Login);

  }
  

}
