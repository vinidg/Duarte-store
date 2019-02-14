import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CategoriaService } from '../../services/domain/categoria.service';
import { CategoriaDTO } from '../../models/categoria.dto';
import { DocumentViewer, DocumentViewerOptions } from '@ionic-native/document-viewer';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

@IonicPage({segment: `?esc_pagename=Categorias`})
@Component({
  selector: 'page-categorias',
  templateUrl: 'categorias.html',
})
export class CategoriasPage {

  items: CategoriaDTO[];

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public categoriaService: CategoriaService,
    private document: DocumentViewer,
    private transfer: FileTransfer,
    private file: File) {
  }

  ionViewDidLoad() {
    this.loadingData();
  }

  loadingData(){
    this.categoriaService.findAll()
    .subscribe(response => {
      this.items = response;
    },
    error => {});

  }

  showProdutos(){
    this.navCtrl.push('ProdutosPage');
  }

  doRefresh(event) {
    this.loadingData();
    setTimeout(() => {
      event.complete();
    }, 1000);
  }

  loadData(event){
      setTimeout(() => {
        event.complete();
        
      }, 1000);
    }

    
  showPdf(){
    const url = 'https://americalatina.dint.fgv.br/sites/americalatina.dint.fgv.br/files/teste33.pdf';
    
    const fileTransfer: FileTransferObject = this.transfer.create();
    fileTransfer.download(url, this.file.cacheDirectory + 'file.pdf').then((entry) =>{
      console.log('Download complete: '+ entry.toURL());
      const options: DocumentViewerOptions = {}
      this.document.viewDocument(entry.toURL(), 'application/pdf', options);

    },(error) =>{
      console.log('ERRO !!!!! '+error);
    });

  }

}
