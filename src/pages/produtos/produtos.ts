import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[] = [];

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public produtosService: ProdutoService,
    public loadingCtrl: LoadingController) {
  }

  ionViewDidLoad() {
    this.loadData()
  }
  
  loadData() {
    let loader = this.presentLoading()

    this.produtosService.findAll()
      .subscribe(res => {
        this.items = this.items.concat(res)
        this.loadImagesUrls()
        loader.dismiss()
      },
      error => {
        loader.dismiss()
      })
  }

  loadImagesUrls() {
    for(let item of this.items){ 
      this.produtosService.getSmallImageFromBucket(item.id)
        .subscribe(res => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/produtos/pr${item.id}-small.jpg`
        },
        error => {
          item.imageUrl = 'assets/imgs/prod.jpg'
        })
    }
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  showDetail(produto_id : string) {
    this.navCtrl.push('ProdutosDetalhesPage', {produto_id: produto_id});
  }

  doRefresh(refresher) {
    this.items = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }
  
}
