///<reference path="routes/dialogs/image-cropper/cropper.component.ts"/>
///<reference path="routes/dialogs/change-password-dialog/change-password-dialog.component.ts"/>
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {HomeComponent} from './routes/home/home.component';
import {AppRouter} from './routes/router.module';
import {LoginComponent} from './routes/login/login.component';
import {SignupComponent} from './routes/signup/signup.component';
import {ForgotPasswordComponent} from './routes/forgot-password/forgot-password.component';
import {AppMaterialModule} from './modules/app-material.module';
import {LookupService} from './services/lookup.service';
import {LoggedUserService} from './services/logged-user.service';
import {ApiCallsService} from './services/api-calls.service';
import {DashboardComponent} from './routes/home/dashboard/dashboard.component';
import {RouterGuardService} from './services/router-guard.service';
import {ResetPasswordComponent} from './routes/reset-password/reset-password.component';
import {HeaderComponent} from "./routes/home/header/header.component";
import {SideMenuComponent} from "./routes/home/side-menu/side-menu.component";
import {MediatorService} from "./services/mediator";
import {AvatarModule} from "ngx-avatar";
import {ProfileComponent} from "./routes/home/profile/profile.component";
import {CalendarComponent} from "./routes/home/calendar/calendar.component";
import {MedicalRecordsComponent} from "./routes/home/medical-records/medical-records.component";
import {PatientRecordComponent} from "./routes/home/medical-records/patient-record/patient-record.component";
import {GetRecordComponent} from "./routes/home/medical-records/get-record/get-records.component";
import {CropperComponent} from "./routes/dialogs/image-cropper/cropper.component";
import {ChangePasswordDialogComponent} from "./routes/dialogs/change-password-dialog/change-password-dialog.component";
import {ImageCropperModule} from "ng2-img-cropper";
import {RequestDialogComponent} from "./routes/dialogs/request-dialog/request-dialog.component";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    ForgotPasswordComponent,
    DashboardComponent,
    ResetPasswordComponent,
    HeaderComponent,
    SideMenuComponent,
    ProfileComponent,
    CalendarComponent,
    MedicalRecordsComponent,
    PatientRecordComponent,
    GetRecordComponent,
    ChangePasswordDialogComponent,
    CropperComponent,
    GetRecordComponent,
    RequestDialogComponent
],
  entryComponents: [ ChangePasswordDialogComponent, CropperComponent, RequestDialogComponent],

  imports: [
    HttpModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRouter,
    AppMaterialModule,
    AvatarModule,
    ImageCropperModule
  ],
  providers: [
    LookupService,
    LoggedUserService,
    ApiCallsService,
    RouterGuardService,
    MediatorService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
