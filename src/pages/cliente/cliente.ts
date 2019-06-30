import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ClienteService } from '../../services/domain/cliente.service';
import { ClienteDTO } from '../../models/cliente.dto';

@IonicPage()
@Component({
  selector: 'page-cliente',
  templateUrl: 'cliente.html',
})
export class ClientePage {

  items: ClienteDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public clienteService: ClienteService) {
  }

  ionViewDidLoad() {
    this.clienteService.findAll()
    .subscribe(response => {
      this.items = response;
    },
    error =>{
      console.log(error);
    });
  }
}
