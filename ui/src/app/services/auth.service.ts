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
    localStorage.setItem('token_id',token);
    localStorage.setItem('user',JSON.stringify(userData));
    this.authToken = token;
    this.user = userData;
  }

  loadToken(){
    const token = localStorage.getItem('token_id');
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

  registerUser(user): Observable<any>{
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.url+"register",user,{headers:headers}).pipe((map((res) => res.json())));
  }

  getUserDetailsByUserId(user): Observable<any>{
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.url+"getUserDetails",user,{headers:headers}).pipe((map((res) => res.json())));
  }

  // for login
  authenticateUser(user): Observable<any>{
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this.http.post(this.url+"login",user,{headers: headers}).pipe((map((res) => res.json())));
  }

}
