import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URL } from '../url';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: Http,
    private authSrv: AuthService
  ) { }

  sentCompanyRequest(requestData): Observable<any>{
    return this.http.post(URL+"sendRequestForCompany",requestData,{headers: this.authSrv.getHeaders(true)}).pipe((map((res) => res.json())));
  }

  applyForJob(postData): Observable<any>{
    return this.http.post(URL+"applyForJob",postData,{headers: this.authSrv.getHeaders(true)}).pipe((map((res) => res.json())));
  }

  checkPreviousRequest(postData): Observable<any>{
    return this.http.post(URL+"checkAnyCompanyRequestSentByUser",postData,{headers: this.authSrv.getHeaders(true)}).pipe((map((res) => res.json())));    
  }

  findJobsForUser(postData): Observable<any>{
    return this.http.post(URL+"getAllJobsForUser",postData,{headers: this.authSrv.getHeaders(true)}).pipe((map((res) => res.json())));        
  }
}
