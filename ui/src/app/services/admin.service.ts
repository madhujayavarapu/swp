import { Injectable } from '@angular/core';
import { LOCATION_URL,URL } from '../url';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(
    private http: Http,
    private authSrv: AuthService
  ) { }

  getCompanyRequests(): Observable<any>{
    return this.http.get(URL+"viewCompanyRequests",{headers: this.authSrv.getHeaders(true)}).pipe((map((res) => res.json())));
  }

  acceptCompanyRequest(postData):Observable<any>{
    return this.http.post(URL+"acceptCompanyRequest", postData, {headers: this.authSrv.getHeaders(true)}).pipe((map((res) => res.json())));    
  }
  
}
