import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProdutosDetalhesPage } from './produtos-detalhes';

@NgModule({
  declarations: [
    ProdutosDetalhesPage,
  ],
  imports: [
    IonicPageModule.forChild(ProdutosDetalhesPage),
  ],
})
export class ProdutosDetalhesPageModule {}
