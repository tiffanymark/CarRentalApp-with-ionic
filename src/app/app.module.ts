import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { Login } from '../pages/login/login';
import { CreateAccount } from '../pages/create-account/create-account';
import { Home } from '../pages/home/home';
import { Page2 } from '../pages/page2/page2';

@NgModule({
  declarations: [
    MyApp,
    Login,
    CreateAccount,
    Home,
    Page2
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
    Page2
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
