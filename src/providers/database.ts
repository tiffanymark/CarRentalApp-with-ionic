import { Injectable } from '@angular/core';
import { SQLite } from 'ionic-native';
import { Platform } from 'ionic-angular';
import 'rxjs/add/operator/map';

@Injectable()
export class Database {

  public db: SQLite;

  constructor(public platform: Platform) {
    this.platform.ready().then(() => {
    this.db = new SQLite();
      this.db.openDatabase({
          name: "CarRental.db",
          location: "default"
      }).then(() => {
        this.tryInitUser();
        this.tryInitCategory();
      }, (error) => {
        console.error("Unable to open database ", JSON.stringify(error.err));
      }); 
    });
  }
  
  tryInitUser(){
    this.db.executeSql("CREATE TABLE IF NOT EXISTS UserAccount (id INTEGER PRIMARY KEY AUTOINCREMENT, firstname TEXT, lastname TEXT, address TEXT, phone TEXT, birthday TEXT, email TEXT, username TEXT, password TEXT, photo TEXT)", {}).then((data) => {
              console.log("TABLE CREATED: ", JSON.stringify(data));
          }, (error) => {
              console.error("Unable to execute sql ", JSON.stringify(error.err));
          });
  }

  userAuth(username,password): Promise<any>{
    return this.db.executeSql("SELECT * FROM UserAccount WHERE username = ? AND password = ?", [username, password]).then((users) => {
      console.log("LENGTH: ", users.rows.length);
      if(users.rows.length == 1){
        console.log("USER ID: ", users.rows.item(0).id);
        return users.rows.item(0).id;
      }
      else{
        return null;
      }
    });
  }

  verifyUsernameIfExists(username): Promise<any>{
     return this.db.executeSql("SELECT * FROM UserAccount WHERE username = ?", [username]).then((data) => {
       if(data.rows.length == 1){
         return true;
       } 
       else {
         return false;
       }
     });
  }

  createUser(firstname,lastname,address,phone,birthday,email,username,password): Promise<any>{
    return this.db.executeSql("INSERT INTO UserAccount (firstname, lastname, address, phone, birthday, email, username, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", [firstname,lastname,address,phone,birthday,email,username,password]).then((user) => {
      console.log(firstname,lastname,address,phone,birthday,email,username,password);
      console.log("INSERTED: " + JSON.stringify(user));
    }, (error) => {
        console.log("ERROR: " + JSON.stringify(error.err));
    });
  }

  searchUser(id): Promise<any>{
    return this.db.executeSql("SELECT * FROM UserAccount WHERE id = ?", [id]).then((users) => {
      return users.rows.item(0);
    });
  }

  updateUserAccount(address,phone,email,id): Promise<any>{
    return this.db.executeSql("UPDATE UserAccount SET address = ?, phone = ?, email = ? WHERE id = ?", [address,phone,email,id]).then((data) => {
      console.log("UPDATED: ", JSON.stringify(data));
    }, (error) => {
      console.error("Unable to execute sql: ", JSON.stringify(error.err));
    });
  }
  
  editProfilePhoto(photoPath,id): Promise<any>{
    return this.db.executeSql("UPDATE UserAccount SET photo = ? WHERE id = ?",[photoPath,id]).then((data) => {
      console.log("PHOTO EDITED: ", JSON.stringify(data));
    }, (error) => {
      console.error("Unable to edit photo: ", JSON.stringify(error.err));
    });
  }

  tryInitCategory(){
    this.db.executeSql("CREATE TABLE IF NOT EXISTS Category (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT)", {}).then((data) => {
        console.log("TABLE Category CREATED: ", data);
    }, (error) => {
        console.error("Unable to execute sql CATEGORY ", error);
    });
  }

  searchCategory(id): Promise<any>{
    return this.db.executeSql("SELECT * FROM Category WHERE id = ?", [id]).then((category) => {
      console.log("CATEGORY: ", JSON.stringify(category));
      return category.rows.item(0);
    }, (error) => {
      console.error("UNABLE TO FIND CATEGORY: ", JSON.stringify(error));
    });
  }

}
