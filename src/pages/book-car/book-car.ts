import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, ViewController, Events } from 'ionic-angular';
import { Database } from '../../providers/database';
import { LocalStorage } from '../../providers/local-storage';
import { CarDetails } from '../car-details/car-details';

@Component({
  selector: 'page-book-car',
  templateUrl: 'book-car.html'
})
export class BookCar {

  user_id: number;
  car_id: number;
  car_name: string;
  car_quantity: number;


  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public viewCtrl: ViewController, public events: Events, private database: Database, private localStorage: LocalStorage) {

    this.menuCtrl.enable(false, "logon");

    this.initBookCarPage();

  }

  initBookCarPage(){
    this.localStorage.getUserId().then((user_id) => {
      this.user_id = user_id;
    });
    this.localStorage.getCarSelectedId().then((car_id) => {
      this.car_id = car_id;
      this.findCarName(car_id);
    });
  }

  findCarName(car_id){
    this.database.searchCar(car_id).then((car_name) => {
      this.car_name = car_name;
      this.findCarQauntity(car_id);
    });
  }

  findCarQauntity(car_id){
    this.database.verifyCarQauntity(car_id).then((car_quantity) => {
      this.car_quantity = car_quantity;
      console.log("QUANTITY: ", this.car_quantity);
    });
  }

  dismiss(){
    this.menuCtrl.enable(true, "logon");
    this.viewCtrl.dismiss();
  }

  newBooking(){
    
    
    
    
    
    
    
    
    this.menuCtrl.enable(true, "logon");
    this.events.publish('reloadCarDetails');
    this.navCtrl.popTo(CarDetails);
  }

}
