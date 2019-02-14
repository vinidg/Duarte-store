import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteDTO } from '../../models/cliente.dto';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage({segment: `profile?esc_pagename=profile`})
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  cliente : ClienteDTO;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    let localUser = this.storage.getLocalUser();
    if(localUser && localUser.user){
      this.clienteService.findByUser(localUser.user)
      .subscribe(res => {
        this.cliente = res;
        this.getImageIfExists();
      },
      error =>{
        if(error.status == 403){
          this.navCtrl.setRoot('HomePage');
        }
      });
    }else{
      this.navCtrl.setRoot('HomePage');
    }
  }

  getImageIfExists(){
    this.clienteService.getImageFromBucket(this.cliente.id)
    .subscribe(res=>{
      this.cliente.imageUrl = `https://images.unsplash.com/photo-1533736970669-7edc3f971be1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1000&q=80`;
    },
    error=>{});
  }

}
