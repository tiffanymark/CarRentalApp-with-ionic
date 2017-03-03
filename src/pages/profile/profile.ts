import { Component } from '@angular/core';
import { NavController, NavParams, Platform, ModalController, Events } from 'ionic-angular';
import { Database } from '../../providers/database';
import { LocalStorage } from '../../providers/local-storage';
import { EditProfile } from '../edit-profile/edit-profile';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html'
})
export class Profile {

  users: Array<{
    firstname: string,
    lastname: string,
    address: string,
    phone: string,
    birthday: string,
    email: string,
    username: string,
    photo: string
  }>;

  user_id : number;

  defaultPhotoPath: string = "assets/img/avatar.jpg";

  constructor(public navCtrl: NavController, public navParams: NavParams, public platform: Platform, private database: Database, private localStorage: LocalStorage, public modalCtrl: ModalController, public events: Events) {
    
    this.initProfilePage();

    this.events.subscribe('reloadProfile',() => {
      this.navCtrl.setRoot(Profile);
    });

  }

  initProfilePage(){
    this.localStorage.getUserId().then((user_id) => { 
      this.user_id = user_id;
      this.database.searchUser(this.user_id).then((user) => {
        this.users = [{
          firstname: user.firstname,
          lastname: user.lastname,
          address: user.address,
          phone: user.phone,
          birthday: user.birthday,
          email: user.email,
          username: user.username,
          photo: user.photo
        }];
      });
    });
  }

  editAccount(){
    let modal = this.modalCtrl.create(EditProfile);
    modal.present();
  }

  pathForImage(){
    if(this.users[0].photo == null){
      return this.defaultPhotoPath;
    }
    else{
      return this.users[0].photo;
    }
  }


}
