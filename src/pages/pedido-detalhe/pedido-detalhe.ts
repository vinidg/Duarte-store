import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PedidoDTO } from '../../models/pedido.dto';
import { PedidoService } from '../../services/domain/pedido.service';


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
    public pedidosService: PedidoService) {
  }

  ionViewDidLoad() {
    let pedido = this.navParams.get("pedido_id")
    if(pedido == null){
      this.navCtrl.setRoot("PedidosPage")
    }
    this.pedidosService.findById(pedido)
      .subscribe(res => {
        this.pedido = res as PedidoDTO
        console.log(this.pedido)
      })
  }



}
