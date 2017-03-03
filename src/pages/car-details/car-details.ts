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

  carSelected_id: number;

  user_id: number;

  category_id: number;

  category_name: string;
  
  favorite: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: Database, private localStorage: LocalStorage) {
    
    this.initCarDetailsPage();

  }

  initCarDetailsPage(){
    this.localStorage.getCarSelectedId().then((car_id) => {
      this.carSelected_id = car_id;
    });
    this.localStorage.getUserId().then((user_id) => {
      this.user_id = user_id;
    });
    this.localStorage.getCategorySelectedId().then((category_id) => {
      this.category_id = category_id;
    
      this.database.searchCategory(this.category_id).then((category_name) => {
        this.category_name = category_name;
        this.listCarDetails(this.carSelected_id);
      });
    });
  }

  listCarDetails(car_id){
     this.database.searchCar(car_id).then((car) => {
      this.cars = [{
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
      this.verifyIfFavoriteCarExists(this.user_id,this.carSelected_id);
    });
  }

  verifyIfFavoriteCarExists(user_id,car_id){
    this.database.searchFavoriteCarIfExists(user_id,car_id).then((favoriteCarExists) => {
      if(favoriteCarExists){
        this.favorite = true;
      }
      else {
        this.favorite = false;
      }
    });
  }

  favoriteCar(){
      this.database.searchFavoriteCarIfExists(this.user_id,this.carSelected_id).then((favoriteCarExists) => {
        if(favoriteCarExists){
          this.database.removeFavoriteCar(this.user_id,this.carSelected_id).then((favoriteCar) => {
            console.log("Remove favorite car");
            return this.favorite = false;
          });
        } else {
          this.database.saveFavoriteCar(this.user_id,this.carSelected_id).then((favoriteCar) => {
            console.log("Save favorite car");
            return this.favorite = true;
          });
        }
      });
  }


}
