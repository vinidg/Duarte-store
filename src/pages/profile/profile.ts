import { Component } from "@angular/core";
import { IonicPage, NavController, NavParams } from "ionic-angular";
import { StorageService } from "../../services/storage.service";
import { ClienteDTO } from "../../models/cliente.dto";
import { ClienteService } from "../../services/domain/cliente.service";
import { CameraOptions, Camera } from "@ionic-native/camera/ngx";
import { API_CONFIG } from "../../config/api.config";
import { DomSanitizer } from "@angular/platform-browser";

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
    public sanitizer: DomSanitizer
  ) {
    this.profileImage = 'assets/imgs/avatar-blank.png';
  }

  ionViewDidLoad() {
    this.loadData()
  }

  loadData(){
    let localUser = this.storage.getLocalUser();
    if (localUser && localUser.user) {
      this.clienteService.findByUser(localUser.user).subscribe(
        res => {
          this.cliente = res as ClienteDTO
        },
        error => {
          if (error.status == 403) {
            this.navCtrl.setRoot("HomePage");
          }
        }
      );
    } else {
      this.navCtrl.setRoot("HomePage");
    }
  }

  getImageIfExists(){
    this.clienteService.getImageFromBucket(this.cliente.id)
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
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.picture = this.sanitizer.bypassSecurityTrustResourceUrl("data:image/jpeg;base64," + imageData);
        this.cameraOn = false;
      },
      err => {
        alert('Ops, deu problema no camera')
        console.log(err)
      }
    );
  }

  getGalleryPicture() {
    this.cameraOn = true;

    const options: CameraOptions = {
      quality: 100,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.picture = "data:image/png;base64," + imageData;
        this.cameraOn = false;
      },
      err => {}
    );
  }
}
