import { Injectable } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private flashMsgSrv: FlashMessagesService,
    private authSrv: AuthService,
    private router: Router
  ) { }

  getOptions(css){
    var obj = {
      cssClass: css,
      timeout: 1000
    }
    return obj;
  }

  handleError(err){
    if(err.status == 401){
      this.showFlashMsg("Please Login First","danger");
      this.authSrv.logout();
      this.router.navigate(['/login']);
    }else{
      this.showFlashMsg("Something Went Wrong..Please try again","danger");
    }
  }

  showFlashMsg(msg, type){
    this.flashMsgSrv.show(msg, this.getOptions('alert-'+type));
    // this.flashMsgSrv.grayOut(false);
  }
}
