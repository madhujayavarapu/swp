import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';

@Component({
  selector: 'app-postnotification',
  templateUrl: './postnotification.component.html',
  styleUrls: ['./postnotification.component.css']
})
export class PostnotificationComponent implements OnInit {

  empRole: String = "-1";
  branch: String = "-1";
  requirements: String;
  description: String;
  salary: String;
  companyId: String;
  companyName: String;
  branches: String[] = [];
  empType: String = "-1";
  duration: String = "-1";

  constructor(
    private utilsSrv: UtilsService,
    private router: Router,
    private authSrv: AuthService,
    private  validateSrv: ValidateService
  ) { }

  ngOnInit() {
    this.companyId = this.authSrv.getDetailsOfUser('entityId');
    this.getBranchesUnderThisCompany();
  }

  getBranchesUnderThisCompany(){
    let postData = {
      companyId: this.companyId
    }
    this.authSrv.getBranchesUnderCompany(postData).subscribe((res) => {
      if(res.success){
        this.branches = res.data[0].branches; 
        this.companyName = res.data[0].companyName;
      }else{
        this.utilsSrv.showToastMsg("warning","Branches","Failed to get branches");
      }
    },(err) => {
      this.utilsSrv.handleError(err);
    })
  }

  postNotification(){
    let keySkills = this.requirements != undefined ? this.requirements.split(',') : undefined;
    let postData = {
      empRole: this.empRole,
      empType: this.empType,
      duration: this.duration,
      branch: [this.branch],
      requirements: keySkills,
      description: this.description,
      salary: this.salary,
      companyId: this.companyId,
      companyName: this.companyName,
      postedBy: this.authSrv.getDetailsOfUser('username'),
      postedAt: new Date()
    }
    
    if(this.validateSrv.validatePostJobNotificationForm(postData)){
      this.authSrv.postJobNotifaction(postData).subscribe((res) => {
        if(!!res.success){
          this.utilsSrv.showToastMsg("success","Job Notification","Posted Successfully");
          this.utilsSrv.reloadCurrentState();
        }else{
          this.utilsSrv.showToastMsg("warning","Job Notification",res.msg);
          this.utilsSrv.reloadCurrentState();
        }
      },(err) => {
        this.utilsSrv.handleError(err);
      });
    }else{
      this.utilsSrv.showToastMsg("warning","Job Notification","Fill Details First");
    }
  }

}
