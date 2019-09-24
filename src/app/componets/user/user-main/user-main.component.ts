import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-user-main',
  templateUrl: './user-main.component.html',
  styleUrls: ['./user-main.component.scss'],
})
export class UserMainComponent implements OnInit {

  public logo: string = environment.logo;
  public logo_light: string = environment.logo_light;
  public logout: string = environment.logo_blanco;

  constructor(private nav: NavController) { }

  ngOnInit() {}

  public back(){
    this.nav.navigateRoot('main');
  }

  public continue(): void{
    this.nav.navigateRoot('/userPrivacy');
  }

}
