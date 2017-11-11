

import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {SignupComponent} from './signup/signup.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import {RouterGuardService} from '../services/router-guard.service';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {ProfileComponent} from "./home/profile/profile.component";
import {CalendarComponent} from "./home/calendar/calendar.component";
import {MedicalRecordsComponent} from "./home/medical-records/medical-records.component";
import {PatientRecordComponent} from "./home/medical-records/patient-record/patient-record.component";
import {GetRecordComponent} from "./home/medical-records/get-record/get-records.component";

const routes: Routes = [
  {
    path: '', component: HomeComponent, children: [
      {path: '', component: DashboardComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'calendar', component: CalendarComponent},
      {path: 'record', component: PatientRecordComponent},
      {path: 'medical-records', component: MedicalRecordsComponent,  children: [
        {path: 'get-record', component: GetRecordComponent},
        {path: ':id', component: PatientRecordComponent},
      ]},
    ], canActivate: [RouterGuardService]
  },
  {path: 'login', component: LoginComponent},
  {path: 'sign-up', component: SignupComponent},
  {path: 'forgot-password', component: ForgotPasswordComponent},
  {path: 'reset-password/:hash', component: ResetPasswordComponent},
  {path: '**', component: HomeComponent}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRouter {}
