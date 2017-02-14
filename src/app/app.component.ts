import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, ActionSheetController, MenuController } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';

import { Login } from '../pages/login/login';
import { Home } from '../pages/home/home';
import { Localization } from '../pages/localization/localization';


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Login;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public actionsheetCtrl: ActionSheetController, public menuCtrl: MenuController) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: Home },
      { title: 'Localization', component: Localization},
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
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
          icon: !this.platform.is('ios') ? 'log out' : null,
          handler: () => {
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
