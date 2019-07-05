import { Component } from '@angular/core';
import { NavController, IonicPage, LoadingController } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
creds : CredenciaisDTO = {
  email: "",
  pass: ""
};

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController,
    public auth: AuthService,
    public loadingCtrl: LoadingController
    ) {
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);   
  } 

  ionViewDidLeave() {
    this.menu.swipeEnable(true);   
  } 

  ionViewDidEnter(){
    let loader = this.presentLoading();
    this.auth.refreshToken()
    .subscribe(response =>{
      this.auth.successfulLogin(response.headers.get('Authorization'));
      loader.dismiss(); 
      this.navCtrl.setRoot('CategoriasPage');
    },
    error=>{
      loader.dismiss(); 
    });
  }

  login(){
    let loader = this.presentLoading();

    this.auth.authenticate(this.creds)
    .subscribe(response =>{
      this.auth.successfulLogin(response.headers.get('Authorization'));
      loader.dismiss();
      this.navCtrl.setRoot('CategoriasPage');
    },
    error=>{
      loader.dismiss(); 
    });
  }

  signup(){
    this.navCtrl.push('SignupPage');
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }
}
