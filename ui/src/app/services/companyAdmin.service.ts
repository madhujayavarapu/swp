import { Injectable } from '@angular/core';
import { LOCATION_URL,URL } from '../url';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CompanyAdminService {

  constructor(
    private http: Http,
    private authSrv: AuthService
  ) { }

  postJobNotifaction(requestData): Observable<any>{
    return this.http.post(URL+"postJobNotification",requestData,{headers: this.authSrv.getHeaders(true)}).pipe((map((res) => res.json())));
  }

  getBranchesUnderCompany(postData): Observable<any>{
    return this.http.post(URL+"getCompanyBranches",postData,{headers: this.authSrv.getHeaders(true)}).pipe((map((res) => res.json())));    
  }

}
