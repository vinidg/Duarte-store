import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { AuthService } from '../../services/auth.service';
import { ProdutoService } from '../../services/domain/produto.service';
import { ProdutoDTO } from '../../models/produto.dto';

@IonicPage()
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  items: CategoriaDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService: CategoriaService,
    public authService: AuthService,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    this.loadingData();
  }

  ionViewCanEnter() {
    let auth = this.authService.isAuthenticated()
    if(!auth){
      this.authService.logout()
      this.navCtrl.setRoot("HomePage")
    }
    
  }

  loadingData(){
    this.categoriaService.findAll()
      .subscribe(response => {
        this.items = response;
        this.loadingSizeProdutos()
      },
    error => {
    });
    
  }

  loadingSizeProdutos(){
    for(let item of this.items){
      this.produtoService.findByCategorias(item.id)
      .subscribe(res => {
        let itemsProdutos: ProdutoDTO[] = res['content']
        item.quantidade = itemsProdutos.length
        let index = this.items.findIndex(i => i.id == item.id)
        this.items[index] = item
      },
      error=>{})
    }
  }

  showProdutos(categoria_id: string){
    this.navCtrl.push("ProdutosPage", {categoria_id: categoria_id})
      .catch(res=>
        {
          this.navCtrl.setRoot("HomePage")
        }
      );
  }

}
