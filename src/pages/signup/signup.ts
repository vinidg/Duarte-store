import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController, LoadingController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { ClienteService } from '../../services/domain/cliente.service';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  formGroup: FormGroup;
  estados : EstadoDTO[];
  cidades : CidadeDTO[];
  
  constructor(public navCtrl: NavController, 
    public navParams: NavParams, 
    public formBuilder: FormBuilder,
    public cidadesService: CidadeService,
    public estadosService: EstadoService,
    public clienteService: ClienteService,
    public alertCtrl : AlertController,
    public loadingCtrl: LoadingController) {

    this.formGroup = this.formBuilder.group({
      nome: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(120)]],
      email: ['',[Validators.required, Validators.minLength(5), Validators.email]],
      pass: ['',[Validators.required]],
      tipo: ['',[Validators.required]],
      cpf: ['',[Validators.required]],
      estadoId: [null,[Validators.required]],
      cidadeId: [null,[Validators.required]],

    });
  }

  ionViewDidLoad(){
    this.estadosService.findAll()
      .subscribe(res =>{
        this.estados = res;
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
      },
      error=>{});
  }

  presentLoading() {
    let loader = this.loadingCtrl.create({
      content: "Aguarde..."
    });
    loader.present();
    return loader;
  }

  updateCidades(){
    let estado_id = this.formGroup.value.estadoId;
    this.cidadesService.findAll(estado_id)
      .subscribe(res =>{
        this.cidades = res;
        this.formGroup.controls.cidadeId.setValue(null);
      },
      error=>{});
  }
  
  signupUser(){
    let loader = this.presentLoading()
    this.clienteService.insert(this.formGroup.value)
      .subscribe(res =>{
        loader.dismiss()
        this.showInsertOK()
      
      },error =>{
          loader.dismiss()
        }
      );
  }

  showInsertOK(){
    let alert = this.alertCtrl.create({
      title: 'Sucesso!',
      message: 'Cadastro efetuado com sucesso',
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
