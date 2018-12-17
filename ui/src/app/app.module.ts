import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';
import { MultiselectDropdownModule } from 'angular-2-dropdown-multiselect';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';

import { FlashMessagesModule, FlashMessagesService } from 'angular2-flash-messages';
import { ToasterContainerComponent, ToasterModule, ToasterService, ToasterConfig } from 'angular2-toaster';
// import {MatDialogModule, MatFormFieldModule, MatStepperModule,MatSelectModule,MatCardModule,MatExpansionModule,
//   MatButtonModule,MatInputModule,MatDatepickerModule,MatNativeDateModule,MatRadioModule } from '@angular/material';
import { MaterialModule } from './material.module';

import { AuthGuard } from './guards/auth.guard';

import { AuthService } from './services/auth.service';
import { ValidateService } from './services/validate.service';
import { UtilsService } from './services/utils.service';
import { LocationService } from './services/location.service';
import { ConstantService } from './services/constant.service';
import { AdminService } from './services/admin.service';
import { CompanyAdminService } from './services/companyAdmin.service';
import { UserService } from './services/user.service';
import { CommonService } from './services/common.service';


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
import { ReleasednotificationsComponent } from './components/releasednotifications/releasednotifications.component';
import { ApplicantslistComponent } from './components/applicantslist/applicantslist.component';
import { AcceptjobrequestComponent } from './components/acceptjobrequest/acceptjobrequest.component';
import { EditprofileComponent } from './components/editprofile/editprofile.component';

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
    FindjobComponent,
    ReleasednotificationsComponent,
    ApplicantslistComponent,
    AcceptjobrequestComponent,
    EditprofileComponent
  ],
  entryComponents:[
    AcceptjobrequestComponent,
    ProfileComponent,
    EditprofileComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    FormsModule,
    MultiselectDropdownModule,
    NgMultiSelectDropDownModule.forRoot(),
    ReactiveFormsModule,
    MaterialModule,
    RouterModule.forRoot(appRoutes),
    FlashMessagesModule,
    ToasterModule.forRoot()
  ],
  providers: [   
    FlashMessagesService,
    ToasterService,
    AuthService,
    AuthGuard,
    ValidateService,
    UtilsService,
    LocationService,
    ConstantService,
    CommonService,
    AdminService,
    CompanyAdminService,
    UserService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
