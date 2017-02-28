import { Component } from '@angular/core';
import { NavController, NavParams, MenuController, Platform, ToastController } from 'ionic-angular';
import { Database } from '../../providers/database';
import { Login } from '../login/login';


@Component({
  selector: 'page-create-account',
  templateUrl: 'create-account.html'
})
export class CreateAccount {

  public user = {
    firstname: '',
    lastname: '',
    address: '',
    phone: '',
    birthday: '2017-01-01',
    email: '',
    username: '',
    password: ''
  }

  public mask: Array<string | RegExp>

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController, public platform: Platform, private database: Database, public toastCtrl: ToastController) {
    
    this.menuCtrl.enable(false,"logon");

    this.mask = ['(', /[1-9]/, /\d/, ')', ' ', /\d/, /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];

  }

  invalidCreateAccountForm(){
    if(this.user.firstname.length == 0 || this.user.lastname.length == 0 || this.user.address.length == 0 || this.user.phone.length == 0 || this.user.birthday.length == 0 || this.user.email.length == 0 || this.user.username.length == 0 || this.user.password.length == 0) return true;
            return false;
    }

  newAccount(){
    if(this.user.phone.toString().length > 15){
      this.user.phone = this.user.phone.slice(0,15);
    }
    
    this.database.verifyUsernameIfExists(this.user.username).then((data) =>{
      if(data){
        let toast = this.toastCtrl.create({
          message: "This username is taken by another account.",
          duration: 2500,
          position: 'top',
          dismissOnPageChange: true,
          cssClass: "toast-css"
        });
        toast.present();
      }
      else{
        this.database.createUser(this.user.firstname,this.user.lastname,this.user.address,this.user.phone,this.user.birthday,this.user.email,this.user.username,this.user.password).then((data) => {
          this.navCtrl.setRoot(Login);
        });
      }
    });    

  }
  

}
