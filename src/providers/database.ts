import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class Database {

  public db: SQLite;

  id: any;
  firstname: string;
  lastname: string;
  address: string;
  phone: string;
  birthday: string;
  email: string;
  username: string;
  password: string;

  constructor(public platform: Platform) {
    this.platform.ready().then(() => {
    this.db = new SQLite();
      this.db.openDatabase({
          name: "CarRental.db",
          location: "default"
      }).then(() => {
        this.tryInit();
      }, (error) => {
        console.error("Unable to open database ", error);
      }); 
    });
  }

  tryInit(){
    this.db.executeSql("CREATE TABLE IF NOT EXISTS user_account (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT, address TEXT, phone TEXT, birthday TEXT, email TEXT, username TEXT, password TEXT)", {}).then((data) => {
              console.log("TABLE CREATED: ", data);
          }, (error) => {
              console.error("Unable to execute sql ", error);
          });
  }

  userAuth(username,password): Promise<any>{
    return this.db.executeSql("SELECT * FROM user_account WHERE username = ? AND password = ?", [username, password]).then((data) => {
      console.log("LENGTH: ", data.rows.length);
      if(data.rows.length == 1){
        console.log("USER ID: ", data.rows.item(0).id);
        return data.rows.item(0).id;
      }
      else{
        return null;
      }
    });
  }

  createUser(firstname,lastname,address,phone,birthday,email,username,password): Promise<any>{
    return this.db.executeSql("INSERT INTO user_account (firstname, lastname, address, phone, birthday, email, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [firstname,lastname,address,phone,birthday,email,username,password]).then((data) => {
      console.log(firstname,lastname,address,phone,birthday,email,username,password);
      console.log("INSERTED: " + JSON.stringify(data));
    }, (error) => {
        console.log("ERROR: " + JSON.stringify(error.err));
    });
  }

  searchUser(id): Promise<any>{
    return this.db.executeSql("SELECT * FROM user_account WHERE id = ?", [id]).then((data) => {
      return data.rows.item(0);
    });
  }
  

}
