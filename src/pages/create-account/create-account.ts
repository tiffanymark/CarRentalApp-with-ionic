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
    address: '',
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
          this.db.executeSql("CREATE TABLE IF NOT EXISTS user_account (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT, address TEXT, phone TEXT, birthday TEXT, email TEXT, username TEXT, password TEXT)", {}).then((data) => {
              console.log("TABLE CREATED: ", data);
          }, (error) => {
              console.error("Unable to execute sql", error);
          })
        }, (error) => {
          console.error("Unable to open database", error);
        });
    });

  }

  invalidCreateAccountForm(){
    if(this.user.firstname.length == 0 || this.user.lastname.length == 0 || this.user.address.length == 0 || this.user.phone.length == 0 || this.user.birthday.length == 0 || this.user.email.length == 0 || this.user.username.length == 0 || this.user.password.length == 0) return true;
            return false;
    }

  newAccount(){
    this.db.executeSql("INSERT INTO user_account (firstname, lastname, address, phone, birthday, email, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [this.user.firstname,this.user.lastname,this.user.address,this.user.phone,this.user.birthday,this.user.email,this.user.username,this.user.password]).then((data) => {
            console.log(this.user.firstname,this.user.lastname,this.user.address,this.user.phone,this.user.birthday,this.user.email,this.user.username,this.user.password);

            console.log("INSERTED: " + JSON.stringify(data));
        }, (error) => {
            console.log("ERROR: " + JSON.stringify(error.err));
        });
    this.navCtrl.setRoot(Login);

  }
  

}
