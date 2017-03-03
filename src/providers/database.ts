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
        this.tryInitFavoriteCar();
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
      return category.rows.item(0).name;
    }, (error) => {
      console.error("UNABLE TO FIND CATEGORY: ", JSON.stringify(error));
    });
  }

  tryInitCar(){
   this.db.executeSql("CREATE TABLE IF NOT EXISTS Car (id INTEGER PRIMARY KEY AUTOINCREMENT, category INTEGER, name TEXT, brand TEXT, size TEXT, gearshift TEXT, ac BOOLEAN, door INTEGER, abs BOOLEAN, airbag BOOLEAN, quantity INTEGER, photo TEXT)", {}).then((data) => {
        console.log("TABLE Car CREATED: ", data);
    }, (error) => {
        console.error("Unable to execute sql CAR ", error);
    });
  }

  listCarsByCategory(category): Promise<any>{
    return this.db.executeSql("SELECT * FROM Car WHERE category = ? ORDER BY brand ASC", [category]).then((cars) => {
      console.log("CARS LIST: ", JSON.stringify(cars));
      return cars;
    }, (error) => {
      console.error("Unable to list cars: ", JSON.stringify(error));
    });
  }

  searchCar(id): Promise<any>{
    return this.db.executeSql("SELECT * FROM Car WHERE id = ?", [id]).then((car) => {
      console.log("CAR FOUND: ", JSON.stringify(car));
      return car.rows.item(0);
    }, (error) => {
      console.error("Unable to find car: ", JSON.stringify(error));
    });
  }

  verifyAvailability(car_id): Promise<any>{
    return this.db.executeSql("SELECT * FROM Car WHERE id = ?", [car_id]).then((car) => {
      if(car.rows.item(0).quantity > 0){
        return true;
      }
      else {
        return false;
      }
    }, (error) => {
      console.error("UNABLE TO EXECUTE SQL: ", JSON.stringify(error));
    });
  }

  tryInitFavoriteCar(){
    this.db.executeSql("CREATE TABLE IF NOT EXISTS FavoriteCar (id INTEGER PRIMARY KEY AUTOINCREMENT, user INTEGER, car INTEGER)", {}).then((data) => {
      console.log("TABLE FavoriteCar CREATED", JSON.stringify(data));
    }, (error) => {
      console.error("Unable to create FavoriteCar table: ", JSON.stringify(error));
    });
  }

  saveFavoriteCar(user_id,car_id): Promise<any>{
    return this.db.executeSql("INSERT INTO FavoriteCar (user,car) VALUES (?,?)", [user_id,car_id]).then((data) => {
      console.log("FAVORITE CAR INSERTED: ", JSON.stringify(data));
    }, (error) => {
      console.error("FAVORITE CAR WAS NOT INSERTED: ", JSON.stringify(error));
    });
  }

  searchFavoriteCarIfExists(user_id,car_id): Promise<any>{
    return this.db.executeSql("SELECT * FROM FavoriteCar WHERE user = ? AND car = ?", [user_id,car_id]).then((favoriteCar) => {
      if(favoriteCar.rows.length == 1){
        return true;
      }
      else { 
        return false;
      }
    });
  }

  removeFavoriteCar(user_id,car_id): Promise<any>{
    return this.db.executeSql("DELETE FROM FavoriteCar WHERE user = ? AND car = ?", [user_id,car_id]).then((favoriteCar) => {
      console.log("FAVORITE CAR DELETED: ", JSON.stringify(favoriteCar));
    }, (error) => {
      console.error("UNABLE TO DELETE FAVORITE CAR: ", JSON.stringify(error));
    });
  }

}
