import { Routes, CanActivate } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
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
 
export const appRoutes:Routes = [
    {path: '', redirectTo:'login', pathMatch:'full'},
    {path: 'login', component:LoginComponent},
    {path: 'register',component: RegisterComponent},
    {path: 'profile',canActivate: [AuthGuard],component: ProfileComponent, data: {"roles": [1,2,3,5]}},
    {path: 'reqcompany',canActivate: [AuthGuard], component: ReqcompanyComponent,  data: {"roles": [3]}},
    {path: 'status',canActivate: [AuthGuard], component: StatusComponent,  data: {"roles": [1,2,3,5]}},
    { path: 'reqcompanieslist',canActivate: [AuthGuard], component: ReqcompanieslistComponent,  data: {"roles": [1]}},
    { path: 'employees',canActivate: [AuthGuard], component: EmployeesComponent,  data: {"roles": [2]}},
    { path: 'employees/addEmp',canActivate: [AuthGuard], component:AddempComponent,  data: {"roles": [2]}},
    { path: 'employees/hire',canActivate: [AuthGuard], component:HireempComponent, data: {"roles": [2]} },
    { path: 'jobs',canActivate: [AuthGuard], redirectTo: 'jobs/post', pathMatch: 'full', data: {"roles": [2]}},
    { path: 'jobs/post',canActivate: [AuthGuard], component: PostnotificationComponent, data: {"roles": [2]}},
    { path: 'findJob',canActivate: [AuthGuard], component: FindjobComponent, data: {"roles": [3]}},
    { path: 'jobs/released',canActivate: [AuthGuard], component: ReleasednotificationsComponent, data: {"roles": [2]}},
    { path: 'jobs/applicants/:jobId/:type',canActivate: [AuthGuard],component: ApplicantslistComponent, data: {"roles": [2]}},
    {path: 'dashboard',canActivate: [AuthGuard], component: DashboardComponent, data: {"roles": [1,2,3,5]}},

    {path: '**',redirectTo:'login', pathMatch:'full'}
]