import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';

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
    public categoriaService: CategoriaService) {
  }

  ionViewDidLoad() {
    this.loadingData();
  }

  loadingData(){
    this.categoriaService.findAll()
      .subscribe(response => {
        this.items = response;
      },
      error => {});

  }

  showProdutos(){
    this.navCtrl.push('ProdutosPage');
  }

  doRefresh(event) {
    this.loadingData();
    setTimeout(() => {
      event.complete();
    }, 1000);
  }

  loadData(event){
      setTimeout(() => {
        event.complete();
        
      }, 1000);
    }

}
