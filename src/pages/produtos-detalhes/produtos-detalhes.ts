import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ModalController, AlertController, LoadingController } from 'ionic-angular';
import { ProdutoDTO } from '../../models/produto.dto';
import { ProdutoService } from '../../services/domain/produto.service';
import { API_CONFIG } from '../../config/api.config';
import { Carrinho } from '../../models/carrinho';
import { CarrinhoService } from '../../services/domain/carrinho.service';
import { StorageService } from '../../services/storage.service';
import { ClienteService } from '../../services/domain/cliente.service';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { DomSanitizer } from '@angular/platform-browser';
import { AuthService } from '../../services/auth.service';

@IonicPage()
@Component({
  selector: 'page-produtos-detalhes',
  templateUrl: 'produtos-detalhes.html',
})

export class ProdutosDetalhesPage {
  
  item : ProdutoDTO
  cart : Carrinho 
  admin: boolean = false
  picture: any;
  cameraOn: boolean = false;
  pictureProduto

  constructor(public navCtrl: NavController, 
    public navParams: NavParams,
    public produtoService: ProdutoService,
    public carrinhoService: CarrinhoService,
    public storage: StorageService,
    public clienteService: ClienteService,
    public modalCtrl: ModalController,
    public camera: Camera,
    public sanitizer: DomSanitizer,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public authService: AuthService
    ) {
      this.pictureProduto = 'assets/imgs/prod.jpg'
  }

  ionViewDidLoad() {
    this.loadData()

    let perfil : string[]
    this.clienteService.findByEmail(this.storage.getLocalUser().email)
      .subscribe(res => {
        perfil = res.perfis
        if(perfil.indexOf("ADMIN") > -1){
          this.admin = true    
        }
      },error => {
      }
      )
  }

  ionViewCanEnter() {
    return this.authService.isAuthenticated()
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Imagem Salva',
      subTitle: 'Sua imagem foi alterada com sucesso !',
      buttons: ['OK']
    });
    alert.present();
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  loadData() {
    let loader = this.presentLoading()
    let produto_id: string
    if(this.navParams.get('produto_id')){
      produto_id = this.navParams.get('produto_id')
    }else {
      loader.dismiss()
      return this.navCtrl.setRoot("CategoriasPage")
    }
    this.produtoService.findById(produto_id)
      .subscribe(response => {
        this.item = response;
        this.getImageUrlIfExists();
        loader.dismiss()
      },
      error => {
        loader.dismiss()
        this.navCtrl.setRoot("CategoriasPage")
      });
  }

  getImageUrlIfExists() {
    this.produtoService.getImageFromBucket(this.item.id)
      .subscribe(response => {
        this.item.imageUrl = `${API_CONFIG.bucketBaseUrl}/produtos/pr${this.item.id}.jpg`;
        this.blobToDataURL(response).then(dataUrl => {
          let str : string = dataUrl as string;
          this.pictureProduto = this.sanitizer.bypassSecurityTrustUrl(str);
        });
      },
      error => {
        this.item.imageUrl = 'assets/imgs/prod.jpg'
        this.pictureProduto = 'assets/imgs/prod.jpg'
      });
  }

  addToCart(produto: ProdutoDTO) {
    this.carrinhoService.addProduto(produto)
    this.navCtrl.setRoot("CarrinhoPage");
  }

  // https://gist.github.com/frumbert/3bf7a68ffa2ba59061bdcfc016add9ee
  blobToDataURL(blob) {
    return new Promise((fulfill, reject) => {
        let reader = new FileReader();
        reader.onerror = reject;
        reader.onload = (e) => fulfill(reader.result);
        reader.readAsDataURL(blob);
    })
  }

  getCameraPicture() {
    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      targetWidth: 1200,
      targetHeight: 1200,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      cameraDirection: this.camera.Direction.BACK,
      correctOrientation: true,
      allowEdit: true
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.picture = "data:image/jpeg;base64," + imageData;
        this.cameraOn = false;
      },
      err => {
        this.cameraOn = false
      }
    );
  }

  getGalleryPicture() {
    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      targetWidth: 1200,
      targetHeight: 1200,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      correctOrientation: true,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.picture = "data:image/jpeg;base64," + imageData;
        this.cameraOn = false;
      },
      err => {
        this.cameraOn = false
      }
    );
  }

  sendPicture(){
    let loader = this.presentLoading()
    this.produtoService.uploadPicture(this.picture, this.item.id)
      .subscribe(res => {
        this.picture = null;
        this.getImageUrlIfExists()
        loader.dismiss()
        this.showAlert()
      },error => {
        loader.dismiss()
      })
  }

  cancel(){
    this.picture = null
  }
}
