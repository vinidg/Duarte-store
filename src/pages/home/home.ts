import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { MenuController } from 'ionic-angular/components/app/menu-controller';
import { CredenciaisDTO } from '../../models/credenciais.dto';
import { AuthService } from '../../services/auth.service';
import { Tela } from '../../services/Tela';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
creds : CredenciaisDTO = {
  user: "",
  pass: ""
};

  constructor(
    public navCtrl: NavController, 
    public menu: MenuController,
    public auth: AuthService,
    ) {
      Tela.passou("HomePage");
  }

  ionViewWillEnter() {
    this.menu.swipeEnable(false);   
  } 

  ionViewDidLeave() {
    this.menu.swipeEnable(true);   
  } 

  ionViewDidEnter(){
    this.auth.refreshToken()
    .subscribe(response =>{
      this.auth.successfulLogin(response.headers.get('Authorization'));
      this.navCtrl.setRoot('CategoriasPage');
    },
    error=>{});
  }

  login(){
    this.navCtrl.setRoot('CategoriasPage');
  }

  signup(){
    this.navCtrl.push('SignupPage');
  }
}
