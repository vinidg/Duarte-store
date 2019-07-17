import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { PedidoService } from '../../services/domain/pedido.service';
import { ProdutoService } from '../../services/domain/produto.service';

@IonicPage()
@Component({
  selector: 'page-pedido-detalhe',
  templateUrl: 'pedido-detalhe.html',
})
export class PedidoDetalhePage {

  pedido: PedidoDTO

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public pedidosService: PedidoService,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    let pedido = this.navParams.get("pedido_id")
    if(pedido == null){
      this.navCtrl.setRoot("PedidosPage")
    }
    this.pedidosService.findById(pedido)
      .subscribe(res => {
        this.pedido = res as PedidoDTO
          this.detalhesProdutos(this.pedido)
      })
  }

  detalhesProdutos(pedido: PedidoDTO){
    for(let produto of pedido.itemPedidos){
      this.produtoService.findById(produto.produtoId)
        .subscribe(response=> {
          let index = this.pedido.itemPedidos.findIndex(x => x.produtoId == response.id)
          if(index != -1){
              this.pedido.itemPedidos[index].nome = response.nome
          }
        })
      }
  }

  total(){
    let total = 0
    if(this.pedido != null){
      for(let produto of this.pedido.itemPedidos){
        total += produto.preco * produto.quantidade
      }
    }
    return total
  }

}
