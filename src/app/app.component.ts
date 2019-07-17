import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AuthService } from '../services/auth.service';
import { OneSignal } from '@ionic-native/onesignal';

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
    public oneSignal: OneSignal) {
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
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      // OneSignal Code start:
      // Enable to debug issues:
      // window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});

      // var notificationOpenedCallback = function(jsonData) {
      //   console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
      //   if (jsonData.notification.payload.additionalData != null) {
      //     console.log("Here we access addtional data");
      //     if (jsonData.notification.payload.additionalData.openURL != null) {
      //       console.log("Here we access the openURL sent in the notification data");
      //     }
      //   }
      // };

      // window["plugins"].OneSignal
      //   .startInit("84620968-76d7-4501-83da-5eb3c2f2be95")
      //   .handleNotificationOpened(notificationOpenedCallback)
      //   .inFocusDisplaying(window["plugins"].OneSignal.OSInFocusDisplayOption.Notification)
      //   .endInit();
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
