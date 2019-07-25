import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-produtos',
  templateUrl: 'produtos.html',
})
export class ProdutosPage {

  items : ProdutoDTO[] = [];
  page: number = 0
  showItems: boolean = false

  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public produtosService: ProdutoService,
    public loadingCtrl: LoadingController,
    public authService: AuthService) {
  }

  ionViewDidLoad() {
    this.loadData()
  }
  
  ionViewCanEnter() {
    return this.authService.isAuthenticated()
  }
  
  loadData() {
    let loader = this.presentLoading()
    let categoria_id = this.navParams.get('categoria_id')
    this.produtosService.findByCategorias(categoria_id == null ? "" : categoria_id, this.page, 10)
    .subscribe(res => {
      this.items = this.items.concat(res['content'])
      let itemsPicture: ProdutoDTO[] = res['content']
      if(itemsPicture.length > 0){
        this.showItems = false
      }else{
        this.showItems = true
      }
      this.loadImagesUrls(itemsPicture)
      loader.dismiss()
    },
    error => {
      loader.dismiss()
      })
  }

  loadImagesUrls(itemsPicture: ProdutoDTO[]) {
    for(var i=0; i < itemsPicture.length; i++){
      let item = this.items[i]
      this.produtosService.getSmallImageFromBucket(item.id)
        .subscribe(res => {
          item.imageUrl = `${API_CONFIG.bucketBaseUrl}/produtos/pr${item.id}-small.jpg`
        },
        error => {
          item.imageUrl = 'assets/svg/loading.svg'
        })
    }
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      spinner: 'crescent',
    });
    loader.present();
    return loader;
  }

  showDetail(produto_id : string) {
    this.navCtrl.push("ProdutosDetalhesPage", {produto_id: produto_id})
    .catch(res => {
      this.navCtrl.setRoot("HomePage")
    });
  }

  doRefresh(refresher) {
    this.items = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

  doInfinite(infiniteScroll) {
    this.page++;
    this.loadData();
    setTimeout(() => {
      infiniteScroll.complete();
    }, 1000);
  }
  
}
