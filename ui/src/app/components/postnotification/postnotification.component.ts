import { Component, OnInit } from '@angular/core';
import { UtilsService } from '../../services/utils.service';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ValidateService } from '../../services/validate.service';
import { ConstantService } from '../../services/constant.service';
import { CompanyAdminService } from '../../services/companyAdmin.service';

@Component({
  selector: 'app-postnotification',
  templateUrl: './postnotification.component.html',
  styleUrls: ['./postnotification.component.css']
})
export class PostnotificationComponent implements OnInit {

  // variables
  qualification = [];
  selectedBranches = [];
  contactDetails: String;
  jobRole: String = "-1";
  requirements = [];
  experience: String = "-1";
  about: String;
  salary: String;
  companyId: String;
  companyName: String;
  jobType: String = "-1";
  duration: String = "-1";

  // lists
  empRoles: any[];
  skills: any[];
  qualifications: any[];
  branches: any[];
  experiences: any[];

  // dropdownSettings
  dropdownSettings: Object;

  constructor(
    private utilsSrv: UtilsService,
    private router: Router,
    private authSrv: AuthService,
    private  validateSrv: ValidateService,
    private constantSrv: ConstantService,
    private companyAdminSrv: CompanyAdminService
  ) { }

  ngOnInit() {
    this.companyId = this.authSrv.getDetailsOfUser('entityId');
    this.getAllConstants();
  }

  getAllConstants(){
    this.dropdownSettings = this.utilsSrv.getMultiSelectDropdownSettings();
    this.getBranchesUnderThisCompany();
    this.constantSrv.getPostNotificationConstants().subscribe((res) => {
      if(res.success){
        this.skills = res.data.skills;
        this.empRoles = res.data.empRoles;
        this.qualifications = res.data.qualification;
        this.experiences = res.data.experiences;
      }else{
        this.skills = [];
        this.empRoles = [];
        this.qualifications = [];
      }
    },(err) => {
      this.utilsSrv.handleError(err);
    })
  }

  getBranchesUnderThisCompany(){
    let postData = {
      companyId: this.companyId
    }
    this.companyAdminSrv.getBranchesUnderCompany(postData).subscribe((res) => {
      if(res.success){
        this.branches = res.data[0].branches; 
        this.companyName = res.data[0].name;
      }else{
        this.utilsSrv.showToastMsg("warning","Branches","Failed to get branches");
      }
    },(err) => {
      this.utilsSrv.handleError(err);
    })
  }

  postNotification(){

    let aboutJob = (this.about != "" && this.about != undefined) ? this.about.toString().split('\n') : [];
    let postData = {
      "companyId": this.authSrv.getDetailsOfUser('entityId'),
      "salary": this.salary,
      "type": this.jobType,
      "duration": this.duration,
      "experience": this.experience,
      "qualification": this.qualification,
      "requirements": this.requirements,
      "location": this.selectedBranches,
      "about": aboutJob,
      "role": this.jobRole,
      "companyName": this.companyName,
      "contact": this.contactDetails,
      "postedBy": this.authSrv.getDetailsOfUser('userId'),
    }
    
    
    if(this.validateSrv.validatePostJobNotificationForm(postData)){
      // this.utilsSrv.showToastMsg("success","Proceed to post", null);
      this.companyAdminSrv.postJobNotifaction(postData).subscribe((res) => {
        if(!!res.success){
          this.utilsSrv.showToastMsg("success","Job Notification","Posted Successfully");
          // this.utilsSrv.reloadCurrentState();
          // this.router.navigate(['/','jobs','released']);
        }else{
          this.utilsSrv.showToastMsg("warning","Job Notification",res.msg);
          // this.utilsSrv.reloadCurrentState();
        }
      },(err) => {
        this.utilsSrv.handleError(err);
      });
    }else{
      this.utilsSrv.showToastMsg("warning","Job Notification","Fill Details First");
    }
  }

}
