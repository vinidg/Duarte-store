import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PagamentoService } from '../../services/domain/pagamento.service';
import { CarrinhoService } from '../../services/domain/carrinho.service';

@IonicPage()
@Component({
  selector: 'page-forma-pagamento',
  templateUrl: 'forma-pagamento.html',
})
export class FormaPagamentoPage {
  
  formGroup: FormGroup;

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public pagamentoService: PagamentoService,
    public carrinhoService: CarrinhoService) {
      
      this.formGroup = this.formBuilder.group({
        pagamento: ['',[Validators.required]]
  
      });
  }
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }


  concluir(){
    let loader = this.presentLoading()
    let carrinho = this.carrinhoService.getCart()
    this.pagamentoService.insert(carrinho)
      .subscribe(res =>{
        loader.dismiss()
        this.showInsertOK()
        this.navCtrl.setRoot('PedidosPage')
      },error =>{
          loader.dismiss()
        }
      );
  }

  showInsertOK(){
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Pagamento efetuado com sucesso, seu pedido estará sendo encaminhado a distribuidora',
      enableBackdropDismiss: false,
      buttons:[
        {
          text: 'OK',
          handler: () =>{
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

}
