import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URL } from '../url';
// import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;

  constructor(
    private http: Http
    // private jwtHelper: JwtHelperService
  ) { }

  storeUserData(token, userData){
    localStorage.setItem('jwt_token',token);
    localStorage.setItem('user',JSON.stringify(userData));
    this.authToken = token;
    this.user = userData;
  }

  loadToken(){
    const token = localStorage.getItem('jwt_token');
    this.authToken = token;
  }

  getDetailsOfUser(key){
    let userDetails = JSON.parse(localStorage.getItem('user'));
    if(key == "all"){
      return userDetails;
    }
    return userDetails[key];
  }

  // isAuthenticated(): boolean{
  //   const token = localStorage.getItem('jwt_token');
  //   return !this.jwtHelper.isTokenExpired(token);
  // }

  isLoggedIn(){
    this.loadToken();
    if(!!this.authToken){
      return true;
    }
    return false;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  getHeaders(){
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return headers;
  }

  registerUser(user): Observable<any>{
    return this.http.post(URL+"users/register",user,{headers:this.getHeaders()}).pipe((map((res) => res.json())));
  }

  getUserDetailsByUserId(user): Observable<any>{
    return this.http.post(URL+"users/getUserDetails",user,{headers:this.getHeaders()}).pipe((map((res) => res.json())));
  }

  // for login
  authenticateUser(user): Observable<any>{
    return this.http.post(URL+"users/login",user,{headers: this.getHeaders()}).pipe((map((res) => res.json())));
  }

  sentCompanyRequest(requestData): Observable<any>{
    return this.http.post(URL+"users/startupRequest",requestData,{headers: this.getHeaders()}).pipe((map((res) => res.json())));
  }

  getCompanyRequests(): Observable<any>{
    return this.http.get(URL+"users/viewStartupRequests",{headers: this.getHeaders()}).pipe((map((res) => res.json())));
  }

  acceptCompanyRequest(postData): Observable<any>{
    return this.http.post(URL+"users/acceptStartupRequest",postData,{headers: this.getHeaders()}).pipe((map((res) => res.json())));
  }

  postJobNotifaction(postData): Observable<any>{
    return this.http.post(URL+"users/postJobNotification",postData,{headers: this.getHeaders()}).pipe((map((res) => res.json())));
  }

  releasedJobNotifications(postData): Observable<any>{
    return this.http.post(URL+"users/releasedJobNotifications",postData,{headers: this.getHeaders()}).pipe((map((res) => res.json())));
  }

  getBranchesUnderCompany(postData): Observable<any>{
    return this.http.post(URL+"users/getBranchesUnderCompany",postData,{headers: this.getHeaders()}).pipe((map((res) => res.json())));
  }

  getAvailableJobs(postData): Observable<any>{
    return this.http.post(URL+"users/availableJobs",postData, {headers: this.getHeaders()}).pipe((map((res) => res.json())));
  }

  applyForJob(postData): Observable<any>{
    return this.http.post(URL+"users/applyForJob",postData,{headers:this.getHeaders()}).pipe((map((res) => res.json())));
  }

  getAppliedCandidateForjob(postData): Observable<any>{
    return this.http.post(URL+"users/getApplicants",postData,{headers:this.getHeaders()}).pipe((map((res) => res.json())));
  }

  getJobDetails(postData): Observable<any>{
    return this.http.post(URL+"users/getJobDetails",postData,{headers:this.getHeaders()}).pipe((map((res) => res.json()))); 
  }

  HireApplicant(postData): Observable<any>{
    return this.http.post(URL+"users/acceptApplicant",postData,{headers:this.getHeaders()}).pipe((map((res) => res.json()))); 
  }

  rejectApplicant(postData): Observable<any>{
    return this.http.post(URL+"users/rejectApplicant",postData,{headers:this.getHeaders()}).pipe((map((res) => res.json())));
  }

  getEmpUnderCompany(postData): Observable<any>{
    return this.http.post(URL+"users/getEmpUnderCompany",postData,{headers: this.getHeaders()}).pipe((map((res) => res.json())));
  }
}
