import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { PedidoDTO } from '../../models/pedido.dto';
import { AuthService } from '../../services/auth.service';
import { ProdutoService } from '../../services/domain/produto.service';
import { PedidoService } from '../../services/domain/pedido.service';

@IonicPage()
@Component({
  selector: 'page-pedidos',
  templateUrl: 'pedidos.html',
})
export class PedidosPage {

  cliente_id: string
  items: PedidoDTO[]

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public pedidoService: PedidoService,
    public storageService: StorageService,
    public clienteService: ClienteService,
    public authService: AuthService,
    public produtoService: ProdutoService) {
  }

  ionViewDidLoad() {
    this.loadData()
  }

  ionViewDidEnter(){
    this.loadData()
  }

  ionViewCanEnter() {
    let auth = this.authService.isAuthenticated()
    if(!auth){
      this.authService.logout()
      this.navCtrl.setRoot("HomePage")
    }
    this.loadData()
  }

  async loadData(){
    await this.findIdByEmail()
    await this.findPedidosByCliente()
  }

  findPedidosByCliente() {
    return new Promise(resolve => {
      this.pedidoService.findByCliente(this.cliente_id)
        .subscribe(res => {
          this.items = res as PedidoDTO[]
          resolve()
        },error => {})
    })
  }

  async findIdByEmail() {
    return new Promise(resolve => {
      this.clienteService.findByEmail(this.storageService.getLocalUser().email)
      .subscribe(res => {
        this.cliente_id = res.id
        resolve()
      },error => {})
    })
  }

  detalhes(pedido_id: string){
    this.navCtrl.push("PedidoDetalhePage", { pedido_id: pedido_id })
  }

  doRefresh(refresher) {
    this.items = [];
    this.loadData();
    setTimeout(() => {
      refresher.complete();
    }, 1000);
  }

}
