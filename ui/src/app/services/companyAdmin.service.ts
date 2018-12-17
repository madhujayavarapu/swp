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

  releasedJobNotifications(postData): Observable<any>{
    return this.http.post(URL+"getAllJobsPostedByCompany",postData,{headers: this.authSrv.getHeaders(true)}).pipe((map((res) => res.json())));    
  }

  getApplicantsForjob(postData): Observable<any>{
    return this.http.post(URL+"getApplicantsForJob",postData,{headers: this.authSrv.getHeaders(true)}).pipe((map((res) => res.json())));        
  }

  closeJobNotification(postData): Observable<any>{
    return this.http.post(URL+"closeJobNotification",postData,{headers: this.authSrv.getHeaders(true)}).pipe((map((res) => res.json())));            
  }

  shortListApplicant(postData): Observable<any>{
    return this.http.post(URL+"shortListApplicant",postData,{headers: this.authSrv.getHeaders(true)}).pipe((map((res) => res.json())));                
  }

}
