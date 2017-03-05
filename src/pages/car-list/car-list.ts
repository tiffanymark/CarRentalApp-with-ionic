import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Database } from '../../providers/database';
import { LocalStorage } from '../../providers/local-storage';
import { CarDetails } from '../car-details/car-details'

@Component({
  selector: 'page-car-list',
  templateUrl: 'car-list.html'
})
export class CarList {

  categories: Array<{ id: number, name: string }>;

  cars: Array<{
    id: number,
    name: string,
    brand: string,
    photo: string,
    quantity: number,
    availability: boolean
  }>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: Database, private localStorage: LocalStorage) {

    this.initCarListPage();

  }

  initCarListPage(){
    this.localStorage.getCategorySelectedId().then((category_id) => {
      this.database.searchCategory(category_id).then((category_name) => {
        this.categories = [{
          id: category_id,
          name: category_name
        }];
        this.listCar(category_id);
      });
    });
  }

  listCar(category_id){
    this.database.listCarsByCategory(category_id).then((carsList) => {
      this.cars = [];
      for(let i = 0; i < carsList.rows.length; i++){
        this.database.verifyAvailability(carsList.rows.item(i).id).then((carIsAvailable) => {
          this.cars.push({
            id: carsList.rows.item(i).id,
            name: carsList.rows.item(i).name,
            brand: carsList.rows.item(i).brand,
            photo: carsList.rows.item(i).photo,
            quantity: carsList.rows.item(i).quantity,
            availability: carIsAvailable
          });
        });
      }
    });
  }

  moreDetails(car_id){
    this.localStorage.setCarSelectedId(car_id);
    this.navCtrl.push(CarDetails);
  }

}
