import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-terms',
  templateUrl: './user-terms.component.html',
  styleUrls: ['./user-terms.component.scss'],
})
export class UserTermsComponent implements OnInit {
  isChecked: boolean;
  isValido: boolean;
  public logout: string = environment.logo_blanco;

  constructor(private navCtrl: NavController) {
    this.isChecked = false;
    this.isValido = true;
   }

  ngOnInit() {}

  aceptarAvisoProvacidad() {
    if (this.isChecked  === true) {
      this.isValido = false;
    } else {
      this.isValido = true;
    }
  }

  clickAceptarAvisoProvacidad() {
    if (this.isChecked  === true) {
      this.isChecked = false;
      this.isValido = false;
    } else {
      this.isChecked = true;
      this.isValido = true;
    }
  }

  public back(){
    this.navCtrl.pop();
  }

  goUserDocuments() {
    this.navCtrl.navigateForward('/UserDocuments');
  }

}
