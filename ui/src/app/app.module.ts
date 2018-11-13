import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { ToasterContainerComponent, ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';

import { AuthService } from './services/auth.service';
import { ValidateService } from './services/validate.service';
import { UtilsService } from './services/utils.service';

import { appRoutes } from './app.routes';

import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReqcompanyComponent } from './components/reqcompany/reqcompany.component';
import { StatusComponent } from './components/status/status.component';
import { ReqcompanieslistComponent } from './components/reqcompanieslist/reqcompanieslist.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { AddempComponent } from './components/addemp/addemp.component';
import { HireempComponent } from './components/hireemp/hireemp.component';
import { PostnotificationComponent } from './components/postnotification/postnotification.component';
import { FindjobComponent } from './components/findjob/findjob.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ProfileComponent,
    ReqcompanyComponent,
    StatusComponent,
    ReqcompanieslistComponent,
    EmployeesComponent,
    AddempComponent,
    HireempComponent,
    PostnotificationComponent,
    FindjobComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    ToasterModule.forRoot()
  ],
  providers: [
    FlashMessagesService,
    ToasterService,
    AuthService,
    ValidateService,
    UtilsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
