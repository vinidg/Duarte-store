import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CarrinhoService } from '../../services/domain/carrinho.service';
import { AuthService } from '../../services/auth.service';
import { PedidoService } from '../../services/domain/pedido.service';

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
    public pedidoService: PedidoService,
    public carrinhoService: CarrinhoService,
    public authService: AuthService
    ) {
      
      this.formGroup = this.formBuilder.group({
        pagamento: ['',[Validators.required]]
      });
  }
  ionViewCanEnter() {
    return this.authService.isAuthenticated()
  }
  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });

    loader.present();
    
    setTimeout(() => {
      this.showInsertOK()
      this.navCtrl.setRoot("PedidosPage")
    }, 3000);

    setTimeout(() => {
      loader.dismiss();
    }, 8000);

  }

  concluir(){
    let carrinho = this.carrinhoService.getCart()
    this.pedidoService.insert(carrinho)
    .subscribe(res =>{
      this.presentLoading()
      this.carrinhoService.criarCarrinhoApagar()
      },error =>{
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
          }
        }
      ]
    });
    alert.present();
  }

}
