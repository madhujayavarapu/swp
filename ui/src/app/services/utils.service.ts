import { Injectable } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ToasterService, Toast } from 'angular2-toaster';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private flashMsgSrv: FlashMessagesService,
    private authSrv: AuthService,
    private router: Router,
    private toastrSrv: ToasterService
  ) { }

  getOptions(css){
    var obj = {
      cssClass: css,
      timeout: 1000,
      positionClass: 'top-right',
      animation: 'fade'
    }
    return obj;
  }

  handleError(err){
    if(err.status == 401){
      this.showToastMsg("warning","Please Login First",null);
      this.authSrv.logout();
      this.router.navigate(['/login']);
    }else{
      this.showToastMsg("warning","Error","Something Went Wrong..Please try again");
    }
  }

  getDiffBwDates(date){
    var tempDate = new Date(date);
    var currentDate = new Date();
    var milliseconds = currentDate.getTime() - tempDate.getTime();
    var time;

    const oneDay = 1000*60*60*24;
    const hours = 1000*60*60;
    const minute = 1000*60;

    if(milliseconds > oneDay){
      time = Math.ceil(milliseconds/oneDay);
      return time+" days ago";
    }else{
      if(milliseconds > hours){
        return Math.ceil(milliseconds/hours)+" hours ago";
      }else{ 
        return Math.ceil(milliseconds/minute)+" minutes ago"; 
      }
    }
  }

  formatNumber(number){
    return number;
  }

  reloadCurrentState(){
    window.location.reload();
  }

  showFlashMsg(msg, type){
    this.flashMsgSrv.show(msg, this.getOptions('alert-'+type));
  }

  showToastMsg(type, title, body){
    let toast: Toast = {
      type: type,
      title: title,
      body: body,
      showCloseButton: true
    };
    this.toastrSrv.pop(toast);
  }
}
