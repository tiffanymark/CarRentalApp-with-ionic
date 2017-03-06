import { Component } from '@angular/core';
import { NavController, NavParams, MenuController } from 'ionic-angular';
import { Database } from '../../providers/database';
import { LocalStorage } from '../../providers/local-storage';
import { CarList } from '../car-list/car-list';

@Component({
  selector: 'page-category',
  templateUrl: 'category.html'
})
export class Category {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, private database: Database, private localStorage: LocalStorage) {
    this.menuCtrl.enable(true, "logon");
  }

  listCars(category_id){
    this.localStorage.setCategorySelectedId(category_id);
    this.navCtrl.push(CarList);
  }

}
