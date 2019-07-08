import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, Events } from 'ionic-angular';
import { EnderecoDTO } from '../../models/endereco.dto';
import { CarrinhoService } from '../../services/domain/carrinho.service';
import { EnderecoService } from '../../services/domain/endereco.service';

@IonicPage()
@Component({
  selector: 'page-escolha-endereco',
  templateUrl: 'escolha-endereco.html',
})
export class EscolhaEnderecoPage {

  enderecos: EnderecoDTO[]
  enderecoEntrega: EnderecoDTO

  nome: string;
  endereco: object;

  icone1: string;
  
  icone: string = "ios-arrow-down";
  classe: string = "none";
  atual: boolean = false;

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public carrinhoService: CarrinhoService,
    public enderecoService: EnderecoService,
    public events: Events) {
  }

  ionViewDidLoad() {
    this.loadData()
  }
  
  loadData(){
    let cliente_id = this.carrinhoService.getCart().cliente.id
    this.enderecoService.findEnderecosCliente(cliente_id)
    .subscribe(res => {
      this.enderecos = res as EnderecoDTO[]
      this.selectEnderecoPrincipal()
      },error =>{
      })
    }

  selectEnderecoPrincipal() {
    for(let endereco of this.enderecos){
      if(endereco.principal){
        this.enderecoEntrega = endereco
        let index = this.enderecos.findIndex(x => x.id == endereco.id)
        if(index != -1){
            this.enderecos.splice(index,1)
        }
      }
    }
  }

  selecionarEndereco(enderecoSelecionado: EnderecoDTO){
    let enderecoAnterior = this.enderecoEntrega
    this.enderecos.push(enderecoAnterior)

    let index = this.enderecos.findIndex(x => x.id == enderecoSelecionado.id)
        if(index != -1){
            this.enderecos.splice(index,1)
            this.enderecoEntrega = enderecoSelecionado
        }
  }

  formaPagamento(){
    this.navCtrl.push("FormaPagamentoPage")
  }

  transicao() {

    this.atual = true;
    this.events.publish("dropdown:colapsar");
    this.icone = (this.icone == "ios-arrow-down") ? "ios-arrow-up" : "ios-arrow-down";
    this.classe = (this.classe == "block") ? "none" : "block";

    if(this.icone1==null){
      this.atual = false;
    }
  }

}
