import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Database } from '../../providers/database';
import { LocalStorage } from '../../providers/local-storage';

@Component({
  selector: 'page-car-list',
  templateUrl: 'car-list.html'
})
export class CarList {

  categories: Array<{ id: number, name: string }>;

  cars: Array<{
    name: string,
    brand: string,
    photo: string
  }>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: Database, private localStorage: LocalStorage) {

    this.localStorage.getCategorySelected().then((category_id) => {
      this.database.searchCategory(category_id).then((category) => {
        this.categories = [{
          id: category.id,
          name: category.name
        }];
        this.database.listCarsByCategory(category.id).then((carsList) => {
          this.cars = [];
          for(let i = 0; i < carsList.rows.length; i++){
            this.cars.push({
              name: carsList.rows.item(i).name,
              brand: carsList.rows.item(i).brand,
              photo: carsList.rows.item(i).photo
            });
          }
        });
      });
    });

  }

}
