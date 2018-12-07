import { Injectable } from "@angular/core";
import { Router,CanActivate, ActivatedRouteSnapshot } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { FlashMessagesService } from "angular2-flash-messages";
import { UtilsService } from '../services/utils.service';
import decode from 'jwt-decode';

@Injectable()
export class AuthGuard implements CanActivate{
   constructor(
       private authSrv: AuthService,
       private router: Router,
       private flashMsgSrv: FlashMessagesService,
       private utilsSrv: UtilsService
   ){}

   canActivate(route: ActivatedRouteSnapshot): boolean{
        if(!this.authSrv.isLoggedIn()){
            this.utilsSrv.showToastMsg("warning","Please login First",null);
            this.router.navigate(['/login']);
            return false;
        }else if(!this.authSrv.isAuthenticatedForThisRoute(route.data.roles)){
            this.utilsSrv.showToastMsg("warning","Login Problem", "You don't have the access to this page");
            this.router.navigate(['/profile']);
            return false;
        }
        return true;
   }
}