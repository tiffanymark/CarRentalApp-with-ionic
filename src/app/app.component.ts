import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ActionSheetController, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Login } from '../pages/login/login';
import { Home } from '../pages/home/home';
import { Localization } from '../pages/localization/localization';
import { Profile } from '../pages/profile/profile';

import { LocalStorage } from '../providers/local-storage';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  pages_explore: Array<{title: string, component: any}>;

  pages_account: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public actionsheetCtrl: ActionSheetController, public menuCtrl: MenuController, private localStorage: LocalStorage) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages_explore = [
      { title: 'Home', component: Home },
      { title: 'Localization', component: Localization }
    ];

    this.pages_account = [
      { title: 'Profile', component: Profile}
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.localStorage.getSetUserLogon().then((data)=>{
        console.log("USER LOGON STATUS: ", data);
        if(data == true){
          this.nav.setRoot(Home);
        }
        else{
          this.nav.setRoot(Login);
        }
      });
      
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  logout(){
    let actionSheet = this.actionsheetCtrl.create({
      title: 'Are you sure you want to log out?',
      cssClass: 'action-sheets-basic-page',
      buttons: [
        {
          text: 'Log Out',
          role: 'destructive',
          icon: !this.platform.is('ios') ? 'power' : null,
          handler: () => {
            this.localStorage.setUserId(null);
            this.localStorage.setUserLogon(false);
            this.menuCtrl.close();
            this.menuCtrl.enable(false,"logon")
            this.nav.setRoot(Login);
            console.log('Log out clicked');
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          icon: !this.platform.is('ios') ? 'close' : null,
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
}
