import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { UtilsService } from '../../services/utils.service';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-hireemp',
  templateUrl: './hireemp.component.html',
  styleUrls: ['./hireemp.component.css']
})
export class HireempComponent implements OnInit {

  branch: String = "-1";
  username: String;
  salary: Number;

  constructor(
    private router: Router,
    private authSrv: AuthService,
    private utilsSrv: UtilsService,
    private validateSrv: ValidateService
  ) { }

  ngOnInit() {
  }

  sendOffer(){
    console.log("sending offer letter to candidate");
    let postData = {
      username: this.username,
      branch: this.branch,
      salary: this.salary,
    }
    if(this.validateSrv.validateSendingOfferLetterForm(postData)){
      this.utilsSrv.showFlashMsg("Proceed to send offer letter", "success");
    }else{
      this.utilsSrv.showFlashMsg("Fill Details First", "danger");
    }
    
  }

}
