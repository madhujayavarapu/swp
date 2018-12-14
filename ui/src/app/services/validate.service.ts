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
    if(this.isEmpty(company.name) || this.isEmpty(company.website) || !this.checkArray(JSON.parse(company.about)) || this.isEmpty(company.createdBy)
      || !this.checkArray(company.awards) || !this.checkArray(company.branches) || !this.validateUrl(company.website)
    || !this.checkArray(JSON.parse(company.address))){
      return false;
    }
    return true;
  }

  validateSendingOfferLetterForm(formData): boolean{
    if(this.isEmpty(formData.username) || this.isEmpty(formData.salary) || formData.branch == "-1" || isNaN(parseInt(formData.salary))){
      return false;
    }
    return true;
  }

  validatePostJobNotificationForm(formData): boolean{
    if(formData.about.length == 0 || this.isEmpty(formData.salary) || formData.location.length == 0 || formData.role == "-1" || 
    isNaN(parseInt(formData.salary)) || formData.requirements.length == 0 || formData.type == "-1" || (formData.type == "internship" &&
    formData.duration == -1) || formData.qualification.length == 0 || this.isEmpty(formData.contact
    || formData.experience == "-1")){
      return false;
    }
    return true;
  }
}
