import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './componets/main/main.component';

import { Geolocation } from '@ionic-native/geolocation/ngx';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { IonicStorageModule } from '@ionic/storage';
import { Camera } from '@ionic-native/camera/ngx';

import { CameraModule } from './bid/components/camera/camera.module';
import { ModalModule } from './bid/components/modal/modal.module';
import { SignComponent } from './bid/components/sign/sign.component';
import { PdfComponent } from './bid/components/pdf/pdf.component';
import { EnrollmentModule } from './bid/components/enrollment/enrollment.module';
import { LoadingModule } from './bid/components/loading/loading.module';

// register
import { RegisterMainComponent } from './componets/register/register-main/register-main.component';
import { RegisterIdComponent } from './componets/register/register-id/register-id.component';
import { RegisterFingersComponent } from './componets/register/register-fingers/register-fingers.component';
import { RegisterOcrComponent } from './componets/register/register-ocr/register-ocr.component';
import { RegisterIneComponent } from './componets/register/register-ine/register-ine.component';
import { RegisterEndComponent } from './componets/register/register-end/register-end.component';

// user
import { UserMainComponent } from './componets/user/user-main/user-main.component';
import { UserFingersComponent } from './componets/user/user-fingers/user-fingers.component';
import { UserFingersVerifyComponent } from './componets/user/user-fingers-verify/user-fingers-verify.component';
import { UserIdComponent } from './componets/user/user-id/user-id.component';
import { UserAdressComponent } from './componets/user/user-adress/user-adress.component';
import { UserEnrollComponent } from './componets/user/user-enroll/user-enroll.component';
import { UserFacialComponent } from './componets/user/user-facial/user-facial.component';
import { UserOcrComponent } from './componets/user/user-ocr/user-ocr.component';
import { UserIneComponent } from './componets/user/user-ine/user-ine.component';
import { UserKycComponent } from './componets/user/user-kyc/user-kyc.component';
import { UserEndComponent } from './componets/user/user-end/user-end.component';

// tester
import { TesterComponent } from './componets/test/tester/tester.component';
//import { LongPressDirective } from './bid/directives/long-press.directive';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    // register
    RegisterMainComponent, 
    RegisterIdComponent, 
    RegisterFingersComponent,
    RegisterOcrComponent,
    RegisterIneComponent,
    RegisterEndComponent,

    UserMainComponent,
    UserFingersComponent,
    UserFingersVerifyComponent,
    UserIdComponent,
    UserAdressComponent,
    UserEnrollComponent,
    UserFacialComponent,
    UserOcrComponent,
    UserIneComponent,
    UserKycComponent,
    UserEndComponent,

    // tester
    TesterComponent,

    //LongPressDirective

    SignComponent,
    PdfComponent
  ],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CameraModule,
    ModalModule,
    LoadingModule,
    IonicStorageModule.forRoot(),
    EnrollmentModule
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    EnrollmentModule,
    ModalModule,
    LoadingModule,
    CameraModule,
    HttpClientModule,
    FormsModule,
    Geolocation,
    Camera,
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
