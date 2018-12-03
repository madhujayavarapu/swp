import { Injectable } from '@angular/core';
import decode from 'jwt-decode';
// import { JwtHelperService } from '@auth0/angular-jwt';
import { Router,CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UtilsService } from '../services/utils.service';

@Injectable()
export class RoleGuard implements CanActivate{
    constructor(
        // private jwtHelperSrv: JwtHelperService,
        private router: Router,
        private route: ActivatedRouteSnapshot,
        private authSrv: AuthService,
        private utilsSrv: UtilsService
    ){}

    canActivate(route: ActivatedRouteSnapshot): boolean{

        const expectedRole = route.data.expectedRole;
        
        const token = localStorage.getItem('jwt_token');

        // decode the token to get its payload
        const tokenPayload = decode(token);

        // if(!this.authSrv.isAuthenticated() || tokenPayload.role != expectedRole){
        //     this.utilsSrv.showToastMsg("warning","Please login first",null);
        //     this.router.navigate(['/login']);
        //     return false;
        // }
        return true;
    }
}