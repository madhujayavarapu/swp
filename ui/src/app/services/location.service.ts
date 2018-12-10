import { Injectable } from '@angular/core';
import { LOCATION_URL,URL } from '../url';
import { Http } from '@angular/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(
    private http: Http,
    private authService: AuthService
  ) { }

  getCountriesListInInd(): Observable<any>{
    return this.http.get(URL+"location/getCountriesUnderIND",{headers: this.authService.getHeaders(true)}).pipe((map((res) => res.json())));
  }
}
