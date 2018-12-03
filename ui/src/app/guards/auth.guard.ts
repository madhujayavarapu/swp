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
    //    if(!this.authSrv.isAuthenticated()){
    //         this.utilsSrv.showToastMsg("warning","Please login First",null);
    //         this.router.navigate(['/login']);
    //         return false;  
    //    }
       return true;
   }
}