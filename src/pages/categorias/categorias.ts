import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { Tela } from '../../services/Tela';

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
      Tela.passou("CategoriasPage");
  }

  ionViewDidLoad() {
    this.items = [
        {
            id: "1",
            nome: "Informática"
        },
        {
            id: "2",
            nome: "Escritório"
        },
        {
            id: "3",
            nome: "Cama mesa e banho"
        },
        {
            id: "4",
            nome: "Eletrônicos"
        },
        {
            id: "5",
            nome: "Jardinagem"
        },
        {
            id: "6",
            nome: "Decoração"
        },
        {
            id: "7",
            nome: "Perfumaria"
        }
    ]
  };

  showProdutos(){
    this.navCtrl.push('ProdutosPage');
  }

}
