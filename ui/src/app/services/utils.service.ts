import { Injectable } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { ToasterService, Toast } from 'angular2-toaster';
import { RESUMEURL } from '../url';
 
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

  formatResumeFilePath(fileName){
    return RESUMEURL+fileName;
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

    const minute = 1000*60;
    const hour = 1000*60*60;
    const oneDay = 1000*60*60*24;
    const oneWeek = oneDay*7;
    const month = oneWeek*4;
    const year = month*12;
    
    // if(milliseconds >= year){
    //   var suffix = milliseconds < (year*2) ? "year ago" : "years ago";
    //   return Math.floor(milliseconds/year)+" "+suffix;
    // }else if(milliseconds >= month){
    //   var suffix = milliseconds < (month*2) ? "month ago" : "months ago";
    //   return Math.floor(milliseconds/year)+" "+suffix;
    // }else if(milliseconds >= oneWeek){
    //   var suffix = milliseconds < (oneWeek*2) ? "week ago" : "weeks ago";
    //   return Math.floor(milliseconds/oneWeek)+" "+suffix; 
    // }else 
    if(milliseconds >= oneDay){
      var suffix = milliseconds < (oneDay*2) ? "day ago" : "days ago";
      return Math.ceil(milliseconds/oneDay)+" "+suffix;
    }else if(milliseconds >= hour){
      var suffix = milliseconds < (hour*2) ? "hour ago" : "hours ago";
      return Math.floor(milliseconds/hour)+" "+suffix;
    }else{
      var suffix = milliseconds < (minute*2) ? "minute ago" : "minutes ago";
      return Math.ceil(milliseconds/minute)+" "+suffix; 
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
