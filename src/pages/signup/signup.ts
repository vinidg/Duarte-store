import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CidadeService } from '../../services/domain/cidade.service';
import { EstadoService } from '../../services/domain/estado.service';
import { EstadoDTO } from '../../models/estado.dto';
import { CidadeDTO } from '../../models/cidade.dto';
import { ClienteService } from '../../services/domain/cliente.service';
import { Tela } from '../../services/Tela';

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
    public alertCtrl : AlertController) {

    this.formGroup = this.formBuilder.group({
      nome: ['',[Validators.required,Validators.minLength(5),Validators.maxLength(120)]],
      user: ['',[Validators.required, Validators.minLength(5)]],
      pass: ['',[Validators.required]],
      tipo: ['',[]],
      cpf: ['',[Validators.required]],
      estadoId: [null,[]],
      cidadeId: [null,[]],
    });
    Tela.passou("ClientePage");
  }

  ionViewDidLoad(){
    this.estadosService.findAll()
      .subscribe(res =>{
        this.estados = res;
        this.formGroup.controls.estadoId.setValue(this.estados[0].id);
        this.updateCidades();
      },
      error=>{});

      this.estados = [
        {
          id: "1",
          nome: "Minas Gerais"
      },
      {
          id: "2",
          nome: "São Paulo"
      }
      ]
  }
  updateCidades(){
    let estado_id = this.formGroup.value.estadoId;
    this.cidadesService.findAll(estado_id)
      .subscribe(res =>{
        this.cidades = res;
        this.formGroup.controls.cidadeId.setValue(null);
      },
      error=>{});
      this.cidades = [
        {
          id: "3",
          nome: "Campinas"
      },
      {
          id: "2",
          nome: "São Paulo"
      }
    ]
  }
  signupUser(){
    this.clienteService.insert(this.formGroup.value)
      .subscribe(res =>{
        this.showInsertOK();
      },
      error=>{});
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
