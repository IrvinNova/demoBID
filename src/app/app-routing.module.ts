import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { MainComponent } from './components/main/main.component';
import { RegisterMainComponent } from './components/register/register-main/register-main.component';
import { RegisterIdComponent } from './components/register/register-id/register-id.component';
import { RegisterFingersComponent } from './components/register/register-fingers/register-fingers.component';
import { RegisterOcrComponent } from './components/register/register-ocr/register-ocr.component';
import { RegisterIneComponent } from './components/register/register-ine/register-ine.component';
import { RegisterEndComponent } from './components/register/register-end/register-end.component';

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

import { TesterComponent } from './components/test/tester/tester.component';

const routes: Routes = [
  { path: '', redirectTo: 'main', pathMatch: 'full' },
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
