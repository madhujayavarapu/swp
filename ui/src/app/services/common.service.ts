import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { AuthService } from './auth.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { URL } from '../url';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  constructor(
    private http: Http,
    private authSrv: AuthService
  ) { }

//   Profile API's are here..
  getUserProfile(postData): Observable<any>{
    return this.http.post(URL+"getUserProfile",postData, {headers: this.authSrv.getHeaders(true)}).pipe((map((res) => res.json())));      
  }

  createProfile(formData): Observable<any>{
    let token = this.authSrv.getToken();
    let headers = new Headers();
    headers.append('Authorization',token)
    return this.http.post(URL+"profile/create",formData, {headers: headers}).pipe((map((res) => res.json())));          
  }

}
