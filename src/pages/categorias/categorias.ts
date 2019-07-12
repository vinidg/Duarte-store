import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { AuthService } from '../../services/auth.service';

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
    public authService: AuthService) {
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
      },
      error => {});

  }

  showProdutos(categoria_id: string){
    this.navCtrl.push("ProdutosPage", {categoria_id: categoria_id})
      .catch(res=>
        {
          this.navCtrl.setRoot("HomePage")
        }
      );
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
