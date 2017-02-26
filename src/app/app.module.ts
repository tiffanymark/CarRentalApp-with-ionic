import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from '../../node_modules/angular2-text-mask/dist/angular2TextMask';
import { Database } from '../providers/database';
import { LocalStorage } from '../providers/local-storage';
import { Login } from '../pages/login/login';
import { CreateAccount } from '../pages/create-account/create-account';
import { Home } from '../pages/home/home';
import { Localization } from '../pages/localization/localization';
import { Profile } from '../pages/profile/profile';

@NgModule({
  declarations: [
    MyApp,
    Login,
    CreateAccount,
    Home,
    Localization,
    Profile
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    BrowserModule, 
    FormsModule, 
    ReactiveFormsModule, 
    TextMaskModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    Login,
    CreateAccount,
    Home,
    Localization,
    Profile
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Database, LocalStorage]
})
export class AppModule {}
