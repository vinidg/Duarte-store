import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ProdutosDetalhesPage } from './produtos-detalhes';
import { Camera } from '@ionic-native/camera';

@NgModule({
  declarations: [
    ProdutosDetalhesPage,
  ],
  imports: [
    IonicPageModule.forChild(ProdutosDetalhesPage),
  ],
  providers: [
    Camera
  ]
})
export class ProdutosDetalhesPageModule {}
