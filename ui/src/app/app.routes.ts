import { Routes } from '@angular/router';
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
    {path: 'login',component:LoginComponent},
    {path: 'register',component: RegisterComponent},
    {path: 'profile',component: ProfileComponent},
    {path: 'reqcompany', component: ReqcompanyComponent},
    {path: 'status', component: StatusComponent},   
    { path: 'reqcompanieslist', component: ReqcompanieslistComponent},
    { path: 'employees', component: EmployeesComponent},
    { path: 'employees/addEmp', component:AddempComponent },
    { path: 'employees/hire', component:HireempComponent },
    { path: 'jobs', redirectTo: 'jobs/post', pathMatch: 'full'},
    { path: 'jobs/post', component: PostnotificationComponent},
    { path: 'findJob', component: FindjobComponent },
    { path: 'jobs/released', component: ReleasednotificationsComponent},
    { path: 'jobs/applicants/:jobId',component: ApplicantslistComponent},
    {path: 'dashboard',component: DashboardComponent},

    {path: '**',redirectTo:'dashboard', pathMatch:'full'}
]