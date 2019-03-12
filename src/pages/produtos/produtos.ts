import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { Tela } from '../../services/Tela';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    Tela.passou("ClientePage");
  }

  ionViewDidLoad() {
    this.items =[
      {
        id: "1",
        nome: "Mouse",
        preco: 90.00
      },
      {
        id: "2",
        nome: "Teclado",
        preco: 120.00
      }
    ]
  };

}
