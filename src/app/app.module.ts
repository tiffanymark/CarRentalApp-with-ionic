import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Database } from '../providers/database';
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
    IonicModule.forRoot(MyApp)
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
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Database]
})
export class AppModule {}
