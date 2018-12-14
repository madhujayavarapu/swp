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

  sentCompanyRequest(requestData): Observable<any>{
    return this.http.post(URL+"users/startupRequest",requestData,{headers: this.authSrv.getHeaders(true)}).pipe((map((res) => res.json())));
  }

}
