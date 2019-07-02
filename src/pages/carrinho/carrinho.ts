import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CarrinhoService } from '../../services/domain/carrinho.service';
import { ItemPedidos } from '../../models/item.pedido.dto';

@IonicPage()
@Component({
  selector: 'page-carrinho',
  templateUrl: 'carrinho.html',
})
export class CarrinhoPage {

  items: ItemPedidos[]

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public carrinhoService: CarrinhoService) {
  }


  ionViewDidLoad() {
    this.loadData()
  }

  loadData() {
    this.items = this.carrinhoService.getCart().itemPedidos
  }

  total(){
    return this.carrinhoService.total()
  }

  
  goOn(){
    this.navCtrl.setRoot('CategoriasPage')
  }

  checkout(){
    this.navCtrl.push('EnderecosPage')
  }

}
