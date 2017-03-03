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

  user_id: number;

  category: string;
  
  favorite: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private database: Database, private localStorage: LocalStorage) {
    
    this.localStorage.getCarSelected().then((car_id) =>{
      this.localStorage.getUserId().then((user_id) => {
        this.user_id = user_id;
        this.localStorage.getCategorySelected().then((category_id) => {
          this.database.searchCategory(category_id).then((category) => {
            this.category = category.name;
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
              this.database.searchFavoriteCarIfExists(this.user_id,this.cars[0].id).then((favoriteCarExists) => {
                if(favoriteCarExists){
                  this.favorite = true;
                }
                else {
                  this.favorite = false;
                }
              });
            });
          });
        });
      });
    });
  }

  favoriteCar(){
      this.database.searchFavoriteCarIfExists(this.user_id,this.cars[0].id).then((favoriteCarExists) => {
        if(favoriteCarExists){
          this.database.removeFavoriteCar(this.user_id,this.cars[0].id).then((favoriteCar) => {
            console.log("Remove favorite car");
            return this.favorite = false;
          });
        } else {
          this.database.saveFavoriteCar(this.user_id,this.cars[0].id).then((favoriteCar) => {
            console.log("Save favorite car");
            return this.favorite = true;
          });
        }
      });
  }


}
