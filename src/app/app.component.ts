import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';
import { OneSignal } from '@ionic-native/onesignal';
import { HeaderColor } from '@ionic-native/header-color';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  
  rootPage: string = 'HomePage';
  
  pages: Array<{title: string, component: string}>;

  constructor(
    public platform: Platform, 
    public statusBar: StatusBar, 
    public splashScreen: SplashScreen,
    public auth : AuthService,
    public oneSignal: OneSignal,
    public headerColor: HeaderColor) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Perfil', component: 'ProfilePage' },
      { title: 'Produtos', component: 'CategoriasPage' },
      { title: 'Pedidos', component: 'PedidosPage' },
      { title: 'Logout', component: '' },
    ];
    
  }
  
  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#0099FF');
      this.statusBar.styleDefault();

      
      this.oneSignal.startInit('84620968-76d7-4501-83da-5eb3c2f2be95');
      this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
      this.oneSignal.handleNotificationOpened().subscribe((obj) => {
        let data = obj.notification.payload.additionalData
        if(data != null){
          this.nav.setRoot(data.page)
          .catch(res => {
            this.nav.setRoot("HomePage")
          });
        }
      });
      this.oneSignal.endInit();
      
    });
    this.headerColor.tint("#0099FF")
    
    this.splashScreen.hide();
  }

  openPage(page : {title:string, component:string}) {
    switch(page.title){
      case 'Logout':
      this.auth.logout();
      this.nav.setRoot('HomePage')
      break;
      default:
      this.nav.setRoot(page.component);
    }
  }
}
