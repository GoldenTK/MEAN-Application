import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';

import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { SmartComponentsService } from './services/smart-components.service';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { AuthGuard } from './guards/auth.guard';
import { ChangePasswordComponent } from './components/profile/change-password/change-password.component';
import { ToogleSwitchComponent } from './components/dashboard/toogle-switch/toogle-switch.component';
import { ManageSmartDeviceComponent } from './components/manage-smart-device/manage-smart-device.component';
import { AddSmartDeviceComponent } from './components/manage-smart-device/add-smart-device/add-smart-device.component';
import { DeleteSmartDeviceComponent } from './components/manage-smart-device/delete-smart-device/delete-smart-device.component';

const appRoutes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'login', component: LoginComponent},
  {path: 'manageSmartDevice', component: ManageSmartDeviceComponent, canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: '**', component: HomeComponent}

]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DashboardComponent,
    ProfileComponent,
    ChangePasswordComponent,
    ToogleSwitchComponent,
    ManageSmartDeviceComponent,
    AddSmartDeviceComponent,
    DeleteSmartDeviceComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule
  ],
  providers: [ValidateService, AuthService, SmartComponentsService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
