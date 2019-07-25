import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from "ionic-angular";
import { StorageService } from "../../services/storage.service";
import { ClienteDTO } from "../../models/cliente.dto";
import { ClienteService } from "../../services/domain/cliente.service";
import { API_CONFIG } from "../../config/api.config";
import { DomSanitizer } from "@angular/platform-browser";
import { Camera, CameraOptions } from "@ionic-native/camera";
import { AuthService } from "../../services/auth.service";

@IonicPage()
@Component({
  selector: "page-profile",
  templateUrl: "profile.html"
})
export class ProfilePage {
  cliente: ClienteDTO;
  picture: any;
  cameraOn: boolean = false;
  profileImage

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storage: StorageService,
    public clienteService: ClienteService,
    public camera: Camera,
    public sanitizer: DomSanitizer,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public authService: AuthService
  ) {
    this.profileImage = 'assets/imgs/blank-avatar.png';
  }

  ionViewDidLoad() {
    this.loadData()
  }

  ionViewCanEnter() {
    let auth = this.authService.isAuthenticated()
    if(!auth){
      this.authService.logout()
      this.navCtrl.setRoot("HomePage")
    }
    
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      spinner: 'crescent',
    });
    loader.present();
    return loader;
  }

  showAlert() {
    const alert = this.alertCtrl.create({
      title: 'Imagem Salva',
      subTitle: 'Sua imagem foi alterada com sucesso !',
      buttons: ['OK']
    });
    alert.present();
  }

  loadData(){
    let loader = this.presentLoading()
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.email) {
      this.clienteService.findByEmail(localUser.email).subscribe(
        res => {
          this.cliente = res as ClienteDTO
          this.getImageIfExists()
          loader.dismiss()
        },
        error => {
          loader.dismiss()
          if (error.status == 403) {
            this.navCtrl.setRoot("HomePage");
          }
        }
        );
      } else {
        loader.dismiss()
        this.navCtrl.setRoot("HomePage");
    }
  }

  async getImageIfExists(){
    await this.clienteService.getImageFromBucket(this.cliente.id)
        .subscribe(res => {
          this.cliente.imageUrl = `${API_CONFIG.bucketBaseUrl}/clientes/cp${this.cliente.id}.jpg`
          this.blobToDataURL(res).then(dataUrl => {
            let str : string = dataUrl as string;
            this.profileImage = this.sanitizer.bypassSecurityTrustUrl(str);
          });
        },
        error => {
          this.profileImage = 'assets/imgs/blank-avatar.png'
        })
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
    this.clienteService.uploadPicture(this.picture)
      .subscribe(res => {
        this.picture = null;
        this.getImageIfExists()
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
