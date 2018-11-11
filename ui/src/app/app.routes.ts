import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ReqcompanyComponent } from './components/reqcompany/reqcompany.component';
import { StatusComponent } from './components/status/status.component';
import { ReqcompanieslistComponent } from './components/reqcompanieslist/reqcompanieslist.component';
 
export const appRoutes:Routes = [
    {path: '', redirectTo:'login', pathMatch:'full'},
    {path: 'login',component:LoginComponent},
    {path: 'register',component: RegisterComponent},
    {path: 'profile',component: ProfileComponent},
    {path: 'reqcompany', component: ReqcompanyComponent},
    {path: 'status', component: StatusComponent},   
    { path: 'reqcompanieslist', component: ReqcompanieslistComponent},
    {path: 'dashboard',component: DashboardComponent},

    {path: '**',redirectTo:'login', pathMatch:'full'}
]