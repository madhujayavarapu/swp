import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidateService {

  constructor() { }

  validatePinCode(pin): boolean{
    let pinn = pin.toString();
    if(isNaN(pin)){
      return false;
    }else if(pinn.length != 6){
      return false;
    }
    return true;
  }

  validatePhone(num): Boolean{
    let number = num.toString();
    if(isNaN(num)){
      return false;
    }else{
      if(number.length != 10){
        return false;
      }
      return true;
    }
  }

  validateUrl(url): Boolean{
    var re = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
    if (!re.test(url)) {
      return false;
    }
    return true;
  }

  checkArray(array): boolean{
    let count = 0;
    if(array.length <= 1 && array[0] == undefined){
      return false;
    }else{
      return true;
    }
  }

  isEmpty(value): boolean{
    if(value == undefined || value == ""){
      return true;
    }
    return false;
  }

  validateUser(user): boolean{
    if(this.isEmpty(user.username) || this.isEmpty(user.password)){
      return false;
    }
    return true;
  }

  validateRegisterDetails(user): boolean{
    if(this.isEmpty(user.username) || this.isEmpty(user.password) || this.isEmpty(user.cpassword)){
      return false;
    }
    return true;
  }

  validateCompanyRequest(company): boolean{
    if(this.isEmpty(company.companyName) || this.isEmpty(company.website) || this.isEmpty(company.about) || this.isEmpty(company.createdBy)
      || !this.checkArray(company.awards) || !this.checkArray(company.branches) || !this.validateUrl(company.website)){
      return false;
    }
    return true;
  }
}
