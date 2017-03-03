import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import 'rxjs/add/operator/map';

@Injectable()
export class LocalStorage {

  storage: any;

  constructor() {

    this.storage = new Storage();

  }

  setUserId(user_id){
    this.storage.set("user_id", user_id);
  }

  getUserId(): Promise<any>{
    return this.storage.get("user_id");
  }

  setUserLogon(logon){
    this.storage.set("user_logon", logon);
  }

  getSetUserLogon(): Promise<any>{
    return this.storage.get("user_logon");
  }

  setCategorySelected(category_id){
    this.storage.set("category_id", category_id);
  }

  getCategorySelected(): Promise<any>{
    return this.storage.get("category_id");
  }

  setCarSelected(car_id){
    this.storage.set("car_id",car_id);
  }

  getCarSelected(): Promise<any>{
    return this.storage.get("car_id");
  }

}
