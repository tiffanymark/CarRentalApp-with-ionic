import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Database } from '../../providers/database';
import { LocalStorage } from '../../providers/local-storage';

@Component({
  selector: 'page-car-details',
  templateUrl: 'car-details.html'
})
export class CarDetails {

  cars: Array<{
    id: number,
    name: string,
    brand: string,
    size: string,
    gearshift: string,
    ac: boolean,
    door: number,
    abs: boolean,
    airbag: boolean,
    photo: string
  }>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: Database, private localStorage: LocalStorage) {
    this.localStorage.getCarSelected().then((car_id) =>{
      this.database.searchCar(car_id).then((car) => {
        this.cars = [{
          id: car.id,
          name: car.name,
          brand: car.brand,
          size: car.size,
          gearshift: car.gearshift,
          ac: car.ac,
          door: car.door,
          abs: car.abs,
          airbag: car.airbag,
          photo: car.photo
        }];
      });
    });
  }


}
