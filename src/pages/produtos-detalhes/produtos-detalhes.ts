import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-produtos-detalhes',
  templateUrl: 'produtos-detalhes.html',
})

export class ProdutosDetalhesPage {
  item : ProdutoDTO
  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let produto_id = this.navParams.get('produto_id');
    this.produtoService.findById(produto_id)
      .subscribe(response => {
        this.item = response;
        this.getImageUrlIfExists();
      },
      error => {});
  }

  getImageUrlIfExists() {
    this.produtoService.getImageFromBucket(this.item.id)
      .subscribe(response => {
        this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/produtos/pr${this.item.id}.jpg`;
      },
      error => {});
  }

  addToCart(produto: ProdutoDTO) {
    // this.cartService.addProduto(produto);
    this.navCtrl.setRoot('CartPage');
  }
}
