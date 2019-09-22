import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainComponent } from './componets/main/main.component';
import { RegisterMainComponent } from './componets/register/register-main/register-main.component';
import { RegisterIdComponent } from './componets/register/register-id/register-id.component';
import { RegisterFingersComponent } from './componets/register/register-fingers/register-fingers.component';
import { RegisterOcrComponent } from './componets/register/register-ocr/register-ocr.component';
import { RegisterIneComponent } from './componets/register/register-ine/register-ine.component';
import { RegisterEndComponent } from './componets/register/register-end/register-end.component';

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
import { UserOtpComponent } from './componets/user/user-otp/user-otp.component';
import { UserEndComponent } from './componets/user/user-end/user-end.component';

import { TesterComponent } from './componets/test/tester/tester.component';

const routes: Routes = [
  { path: '', redirectTo: 'test', pathMatch: 'full' },
  //{ path: '', redirectTo: 'test', pathMatch: 'full' },
  { path: 'main', component: MainComponent, pathMatch: 'full' },
  { path: 'registerMain', component: RegisterMainComponent, pathMatch: 'full' },
  { path: 'registerId', component: RegisterIdComponent, pathMatch: 'full' },
  { path: 'registerFingers', component: RegisterFingersComponent, pathMatch: 'full' },
  { path: 'registerOCR', component: RegisterOcrComponent, pathMatch: 'full' },
  { path: 'registerINE', component: RegisterIneComponent, pathMatch: 'full' },
  { path: 'registerEnd', component: RegisterEndComponent, pathMatch: 'full' },

  { path: 'userMain', component: UserMainComponent, pathMatch: 'full' },
  { path: 'userFingers', component: UserFingersComponent, pathMatch: 'full' },
  { path: 'userFingersVerify', component: UserFingersVerifyComponent, pathMatch: 'full' },
  { path: 'userId', component: UserIdComponent, pathMatch: 'full' },
  { path: 'userAdress', component: UserAdressComponent, pathMatch: 'full' },
  { path: 'userEnroll', component: UserEnrollComponent, pathMatch: 'full' },
  { path: 'userFacial', component: UserFacialComponent, pathMatch: 'full' },
  { path: 'userOcr', component: UserOcrComponent, pathMatch: 'full' },
  { path: 'userINE', component: UserIneComponent, pathMatch: 'full' },
  { path: 'userKyc', component: UserKycComponent, pathMatch: 'full' },
  { path: 'userOtp', component: UserOtpComponent, pathMatch: 'full' },
  { path: 'userEnd', component: UserEndComponent, pathMatch: 'full' },

  { path: 'test', component: TesterComponent, pathMatch: 'full'}
  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
