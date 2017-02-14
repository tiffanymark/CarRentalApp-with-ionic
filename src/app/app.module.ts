import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Login } from '../pages/login/login';
import { CreateAccount } from '../pages/create-account/create-account';
import { Home } from '../pages/home/home';
import { Localization } from '../pages/localization/localization';

@NgModule({
  declarations: [
    MyApp,
    Login,
    CreateAccount,
    Home,
    Localization
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
    Localization
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
