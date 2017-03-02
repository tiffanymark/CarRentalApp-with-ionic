import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Database } from '../../providers/database';
import { LocalStorage } from '../../providers/local-storage';

@Component({
  selector: 'page-car-list',
  templateUrl: 'car-list.html'
})
export class CarList {

  categories: Array<{ id:number, name: string }>;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: Database, private localStorage: LocalStorage) {

    this.localStorage.getCategorySelected().then((category_id) => {
      this.database.searchCategory(category_id).then((category) => {
        this.categories = [{
          id: category.id,
          name: category.name
        }];
      });
    
    });

  }

}
