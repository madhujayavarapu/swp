import { Injectable } from '@angular/core';
import { LOCATION_URL,URL } from '../url';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ConstantService {

  constructor(
    private http: Http,
    private authService: AuthService
  ) { }

  getJobRoles(){
    return this.http.get(URL+"constant/getJobRoles",{headers: this.authService.getHeaders(false)}).pipe((map((res) => res.json())));
  }

  getJobLocations(){
    return this.http.get(URL+"constant/getJobLocations",{headers: this.authService.getHeaders(false)}).pipe((map((res) => res.json())));    
  }

}
