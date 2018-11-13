import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authToken: any;
  user: any;
  url:String = "http://localhost:3000/users/";

  constructor(
    private http: Http
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
    return this.http.post(this.url+"register",user,{headers:this.getHeaders()}).pipe((map((res) => res.json())));
  }

  getUserDetailsByUserId(user): Observable<any>{
    return this.http.post(this.url+"getUserDetails",user,{headers:this.getHeaders()}).pipe((map((res) => res.json())));
  }

  // for login
  authenticateUser(user): Observable<any>{
    return this.http.post(this.url+"login",user,{headers: this.getHeaders()}).pipe((map((res) => res.json())));
  }

  sentCompanyRequest(requestData): Observable<any>{
    return this.http.post(this.url+"startupRequest",requestData,{headers: this.getHeaders()}).pipe((map((res) => res.json())));
  }

  getCompanyRequests(): Observable<any>{
    return this.http.get(this.url+"viewStartupRequests",{headers: this.getHeaders()}).pipe((map((res) => res.json())));
  }

  acceptCompanyRequest(postData): Observable<any>{
    return this.http.post(this.url+"acceptStartupRequest",postData,{headers: this.getHeaders()}).pipe((map((res) => res.json())));
  }

  postJobNotifaction(postData): Observable<any>{
    return this.http.post(this.url+"postJobNotification",postData,{headers: this.getHeaders()}).pipe((map((res) => res.json())));
  }

  getBranchesUnderCompany(postData): Observable<any>{
    return this.http.post(this.url+"getBranchesUnderCompany",postData,{headers: this.getHeaders()}).pipe((map((res) => res.json())));
  }

  getAvailableJobs(): Observable<any>{
    return this.http.get(this.url+"availableJobs",{headers: this.getHeaders()}).pipe((map((res) => res.json())));
  }
}
