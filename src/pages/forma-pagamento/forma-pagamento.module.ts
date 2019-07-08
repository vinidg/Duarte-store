import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FormaPagamentoPage } from './forma-pagamento';
import { PagamentoService } from '../../services/domain/pagamento.service';

@NgModule({
  declarations: [
    FormaPagamentoPage,
  ],
  imports: [
    IonicPageModule.forChild(FormaPagamentoPage),
  ],
  providers: [
    PagamentoService
  ]
})
export class FormaPagamentoPageModule {}
