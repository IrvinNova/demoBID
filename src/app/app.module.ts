import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { MainComponent } from './components/main/main.component';

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
import { RegisterMainComponent } from './components/register/register-main/register-main.component';
import { RegisterIdComponent } from './components/register/register-id/register-id.component';
import { RegisterFingersComponent } from './components/register/register-fingers/register-fingers.component';
import { RegisterOcrComponent } from './components/register/register-ocr/register-ocr.component';
import { RegisterIneComponent } from './components/register/register-ine/register-ine.component';
import { RegisterEndComponent } from './components/register/register-end/register-end.component';

// user
import { UserMainComponent } from './components/user/user-main/user-main.component';
import { UserFingersComponent } from './components/user/user-fingers/user-fingers.component';
import { UserFingersVerifyComponent } from './components/user/user-fingers-verify/user-fingers-verify.component';
import { UserIdComponent } from './components/user/user-id/user-id.component';
import { UserAdressComponent } from './components/user/user-adress/user-adress.component';
import { UserEnrollComponent } from './components/user/user-enroll/user-enroll.component';
import { UserFacialComponent } from './components/user/user-facial/user-facial.component';
import { UserOcrComponent } from './components/user/user-ocr/user-ocr.component';
import { UserIneComponent } from './components/user/user-ine/user-ine.component';
import { UserEndComponent } from './components/user/user-end/user-end.component';

// tester
import { TesterComponent } from './components/test/tester/tester.component';
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
